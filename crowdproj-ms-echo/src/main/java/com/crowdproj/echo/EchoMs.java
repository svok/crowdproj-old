package com.crowdproj.echo;

import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import java.util.Properties;

import org.apache.flink.api.java.utils.ParameterTool;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer010;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaProducer010;
import org.apache.flink.streaming.util.serialization.SimpleStringSchema;
import org.apache.flink.streaming.util.serialization.JSONDeserializationSchema;
import org.apache.kafka.clients.producer.ProducerConfig;

import org.apache.flink.api.common.functions.MapFunction;

import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.system.EventInternalDefault;
import com.crowdproj.common.events.echo.EventEcho;

public class EchoMs {

    public static void main(String[] args) throws Exception {

        final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        env.enableCheckpointing(5000);

        Properties properties = new Properties();
        properties.setProperty("bootstrap.servers", "localhost:9092");
        // only required for Kafka 0.8
        // properties.setProperty("zookeeper.connect", "localhost:2181");
        properties.setProperty("group.id", "echo");

        DataStream<String> stream = env
            .addSource(new FlinkKafkaConsumer010<>("echo", new SimpleStringSchema(), properties));

        //myConsumer.assignTimestampsAndWatermarks(new CustomWatermarkEmitter());
        DataStream<String> responseStream = stream
            .map(new FromJson())
            .map(new Updater())
            .map(new ToJson())
        ;


        FlinkKafkaProducer010.FlinkKafkaProducer010Configuration producerConfig = FlinkKafkaProducer010.writeToKafkaWithTimestamps(
            responseStream,                   // input stream
            "gateway",                // target topic
            new SimpleStringSchema(), // serialization schema
            properties                // custom configuration for KafkaProducer (including broker list)
        );

        // the following is necessary for at-least-once delivery guarantee
//        myProducerConfig.setLogFailuresOnly(false);   // "false" by default
//        myProducerConfig.setFlushOnCheckpoint(true);  // "false" by default
//        */

        env.execute("Flink Streaming echo microservice");
    }
}

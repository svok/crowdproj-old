package com.crowdproj.echo.kafka;

import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import java.util.Properties;

import org.apache.flink.api.java.utils.ParameterTool;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer010;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaProducer010;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaProducer010.FlinkKafkaProducer010Configuration;
import org.apache.flink.streaming.util.serialization.SimpleStringSchema;
//import org.apache.flink.api.common.serialization.SimpleStringSchema;
import org.apache.flink.streaming.util.serialization.JSONDeserializationSchema;
import org.apache.kafka.clients.producer.ProducerConfig;

import org.apache.flink.api.common.functions.MapFunction;

import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.system.EventInternalDefault;
import com.crowdproj.common.events.echo.EventEcho;

public class Kafka010 implements KafkaInterface {

    StreamExecutionEnvironment env;

    public Kafka010(StreamExecutionEnvironment env) {
        setEnv(env);
    }

    public Kafka010 setEnv(StreamExecutionEnvironment env) {
        this.env = env;
        return this;
    }

    public DataStream<String> kafkaSource() {
        Properties properties = new Properties();
        properties.setProperty("bootstrap.servers", "localhost:9092");
        properties.setProperty("group.id", "echo");

        return env
            .addSource(new FlinkKafkaConsumer010<>("echo", new SimpleStringSchema(), properties));
    }

    public void kafkaSink(DataStream<String> stream) {

        Properties properties = new Properties();
        properties.setProperty("bootstrap.servers", "localhost:9092");
        // properties.setProperty("group.id", "echo");

        FlinkKafkaProducer010Configuration producerConfig = FlinkKafkaProducer010.writeToKafkaWithTimestamps(
            stream,                   // input stream
            "gateway",                // target topic
            new SimpleStringSchema(), // serialization schema
            properties                // custom configuration for KafkaProducer (including broker list)
        );
    }

}

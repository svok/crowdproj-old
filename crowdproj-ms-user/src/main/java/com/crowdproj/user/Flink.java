package com.crowdproj.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.api.java.utils.ParameterTool;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer011;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaProducer011;
import org.apache.flink.streaming.util.serialization.SimpleStringSchema;
import org.apache.flink.streaming.util.serialization.JSONDeserializationSchema;
import org.apache.kafka.clients.producer.ProducerConfig;

import org.apache.flink.api.common.functions.MapFunction;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.crowdproj.common.events.system.EventInternalDefault;
import com.crowdproj.common.events.AbstractEventInternal;

//import com.crowdproj.common.events.echo.EventEcho;

public class Flink {

    private static final Logger log = LoggerFactory.getLogger(Flink.class);

    final private StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
    final private ObjectMapper mapper = new ObjectMapper();
    final private Properties properties = new Properties();

    final static public String topic = "user";

    public Flink() {
        env.enableCheckpointing(5000);

        properties.setProperty("bootstrap.servers", "localhost:9092");
        properties.setProperty("group.id", topic);

    }

    public void run() throws Exception {

        DataStream<String> stream = env
            .addSource(new FlinkKafkaConsumer011<>(topic, new SimpleStringSchema(), properties));

        FlinkKafkaProducer011.FlinkKafkaProducer011Configuration producerConfig = FlinkKafkaProducer011.writeToKafkaWithTimestamps(
            stream,                   // input stream
            "gateway",                // target topic
            new SimpleStringSchema(), // serialization schema
            properties                // custom configuration for KafkaProducer (including broker list)
        );

        // the following is necessary for at-least-once delivery guarantee
//        myProducerConfig.setLogFailuresOnly(false);   // "false" by default
//        myProducerConfig.setFlushOnCheckpoint(true);  // "false" by default
//        */

        env.execute("User management microservice");
    }
}

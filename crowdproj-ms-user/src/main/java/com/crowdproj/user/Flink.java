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

import com.crowdproj.common.kafka.KafkaInterface;
import com.crowdproj.common.kafka.Kafka010;

public class Flink {

    private static final Logger log = LoggerFactory.getLogger(Flink.class);

    final private StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
    final private ObjectMapper mapper = new ObjectMapper();
    final private Properties properties = new Properties();

    final static public String topicIn = "user";
    final static public String groupId = "user";
    final static public String topicOut = "gateway";

    public Flink() {
        env.enableCheckpointing(5000);
    }

    public void run() throws Exception {

        KafkaInterface kafka = new Kafka010(env);
        kafka.setTopicIn();
        DataStream<String> stream = kafka.kafkaSource(topicIn, groupId);
        kafka.kafkaSink(responseStream, topicOut);

        // the following is necessary for at-least-once delivery guarantee
//        myProducerConfig.setLogFailuresOnly(false);   // "false" by default
//        myProducerConfig.setFlushOnCheckpoint(true);  // "false" by default
//        */

        env.execute("User management microservice");
    }
}

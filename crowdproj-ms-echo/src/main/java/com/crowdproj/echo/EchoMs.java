package com.crowdproj.echo;

import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import java.util.Properties;

import org.apache.flink.api.java.utils.ParameterTool;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.kafka.clients.producer.ProducerConfig;

import org.apache.flink.api.common.functions.MapFunction;

import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.system.EventInternalDefault;
import com.crowdproj.common.events.echo.EventEcho;

import com.crowdproj.common.kafka.KafkaInterface;
import com.crowdproj.common.kafka.Kafka010;

public class EchoMs {

    public static void main(String[] args) throws Exception {

        final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        env.enableCheckpointing(5000);

        KafkaInterface kafka = new Kafka010(env);

        DataStream<String> stream = kafka.kafkaSource();

        DataStream<String> responseStream = stream
            .map(new FromJson())
            .map(new Updater())
            .map(new ToJson())
        ;

        kafka.kafkaSink(responseStream);

        // the following is necessary for at-least-once delivery guarantee
//        myProducerConfig.setLogFailuresOnly(false);   // "false" by default
//        myProducerConfig.setFlushOnCheckpoint(true);  // "false" by default
//        */

        env.execute("Flink Streaming echo microservice");
    }
}

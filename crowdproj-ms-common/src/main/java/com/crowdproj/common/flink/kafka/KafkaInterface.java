package com.crowdproj.common.kafka;

import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import org.apache.flink.streaming.api.datastream.DataStream;

public interface KafkaInterface {

    public KafkaInterface setEnv(StreamExecutionEnvironment env);
    public DataStream<String> kafkaSource();
    public void kafkaSink(DataStream<String> stream);

}

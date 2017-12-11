package com.crowdproj.echo;

import org.apache.flink.streaming.util.StreamingMultipleProgramsTestBase;

import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.api.java.utils.ParameterTool;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaConsumer010;
import org.apache.flink.streaming.connectors.kafka.FlinkKafkaProducer010;
import org.apache.flink.streaming.util.serialization.SimpleStringSchema;
import org.apache.flink.streaming.util.serialization.JSONDeserializationSchema;
import org.apache.kafka.clients.producer.ProducerConfig;

import org.apache.flink.streaming.api.functions.sink.SinkFunction;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.crowdproj.echo.FromJson;
import com.crowdproj.echo.Updater;
import com.crowdproj.echo.ToJson;

import org.junit.Test;
import org.junit.runner.RunWith;

public class EchoIntegrationTest extends StreamingMultipleProgramsTestBase {

    @Test
    public void echoTest() throws Exception {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

        // configure your test environment
        env.setParallelism(1);

        // values are collected in a static variable
        CollectSink.values.clear();

        // create a stream of custom elements and apply transformations
//        env.fromElements("{\"id\":\"1234567890\",\"tsCreated\":100000,\"wsSessionId\":\"gwerwfserw345345\",\"type\":\"echo.echo\"}")
        env.fromElements("{\"id\":\"1234567890\",\"type\":\"echo.echo\"}")
            .map(new FromJson())
            .map(new Updater())
            .map(new ToJson())
            .addSink(new CollectSink());

        // execute
        env.execute();

        // verify your results
        System.out.println("CollecSink: " + CollectSink.values);
        assert
            Arrays
            .asList("{\"type\":\"echo.response: \",\"id\":\"1234567890\",\"class\":\"com.crowdproj.common.events.echo.EventEcho\"}")
            .equals(CollectSink.values);
    }

    // create a testing sink
    private static class CollectSink implements SinkFunction<String> {

        // must be static
        public static final List<String> values = new ArrayList<>();

        @Override
        public synchronized void invoke(String value) throws Exception {
            values.add(value);
        }
    }
}

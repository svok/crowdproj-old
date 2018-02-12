/**
 *
 * Copyright © 2017 Sergey Okatov. All rights reserved.
 * Author: Sergey Okatov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.crowdproj.echo;

import org.apache.flink.streaming.util.StreamingMultipleProgramsTestBase;

import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.api.java.utils.ParameterTool;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.util.serialization.JSONDeserializationSchema;

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
    public void testContext() throws Exception {
    }

    @Test
    public void echoTest() throws Exception {
        final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
//        env.setStreamTimeCharacteristic(TimeCharacteristic.IngestionTime);

        // configure your test environment
//        env.setParallelism(1);

        // values are collected in a static variable
        CollectSink.values.clear();

        // create a stream of custom elements and apply transformations
//        env.fromElements("{\"id\":\"1234567890\",\"tsCreated\":100000,\"wsSessionId\":\"gwerwfserw345345\",\"type\":\"echo.echo\"}")
        env.fromElements("{\"id\":\"1234567890\",\"type\":\"echo.echo\"}")
//            .map(new FromJson())
//            .map(new Updater())
//            .map(new ToJson())
            .addSink(new CollectSink());

        // execute
        env.execute();

/*
        // verify your results
        System.out.println("CollecSink: " + CollectSink.values);
        assert
            Arrays
            .asList("{\"type\":\"echo.response: \",\"id\":\"1234567890\",\"class\":\"com.crowdproj.common.events.echo.EventEcho\"}")
            .equals(CollectSink.values);
//*/
    }

    // create a testing sink
    private static class CollectSink implements SinkFunction<String> {

        // must be static
        public static final List<String> values = new ArrayList<>();

        @Override
//        public synchronized void invoke(String value, SinkFunction.Context context) throws Exception {
        public synchronized void invoke(String value) throws Exception {
            values.add(value);
        }
    }
}

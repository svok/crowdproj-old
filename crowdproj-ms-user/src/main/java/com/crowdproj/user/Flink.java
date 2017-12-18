package com.crowdproj.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;
import java.util.List;
import java.util.ArrayList;

import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.api.java.utils.ParameterTool;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.datastream.SplitStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.streaming.api.collector.selector.OutputSelector;

import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.system.EventInternalDefault;
import com.crowdproj.common.events.user.EventSender;

import com.crowdproj.common.kafka.KafkaInterface;
import com.crowdproj.common.kafka.Kafka010;
import com.crowdproj.common.nodes.FromJson;
import com.crowdproj.common.nodes.ToJson;

import com.crowdproj.user.nodes.*;

public class Flink {

    private static final Logger log = LoggerFactory.getLogger(Flink.class);

    final private StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
    final private Properties properties = new Properties();

    final static public String topicIn = "user";
    final static public String groupId = "user";
    final static public String topicSender = "sender";
    final static public String topicOut = "gateway";

    public Flink() {
        env.enableCheckpointing(5000);
    }

    public void run() throws Exception {

        KafkaInterface kafka = new Kafka010(env);
        DataStream<String> stream = kafka.kafkaSource(topicIn, groupId);

        SplitStream<AbstractEventInternal> splitByType = stream.map(new FromJson()).split(new OutputSelector<AbstractEventInternal>() {
            @Override
            public Iterable<String> select(AbstractEventInternal value) {
                List<String> output = new ArrayList<String>();
                if(value.getType().equals("user.signin")) {
                    output.add("user.signin");
                } else if(value.getType().equals("user.signup")) {
                    output.add("user.signup");
                } else {
                    output.add("unknown");
                }
                return output;
            }
        });

        DataStream<AbstractEventInternal> signin = splitByType.select("user.signin").map(new SigninNode());
        DataStream<AbstractEventInternal> signup = splitByType.select("user.signup").flatMap(new SignupNode());
        DataStream<AbstractEventInternal> unknown = splitByType.select("unknown");

        DataStream<AbstractEventInternal> union = unknown.union(signin, signup);
        SplitStream<AbstractEventInternal> splitByTopic = union.split(new OutputSelector<AbstractEventInternal>() {
            @Override
            public Iterable<String> select(AbstractEventInternal value) {
                List<String> output = new ArrayList<String>();
                if(value instanceof EventSender) {
                    output.add("sender");
                } else {
                    output.add("gateway");
                }
                return output;
            }
        });


        DataStream<String> senderStream = splitByTopic.select("sender").map(new ToJson());
        DataStream<String> responseStream = splitByTopic.select("gateway").map(new ToJson());

        kafka.kafkaSink(senderStream, topicSender);
        kafka.kafkaSink(responseStream, topicOut);

        // the following is necessary for at-least-once delivery guarantee
//        myProducerConfig.setLogFailuresOnly(false);   // "false" by default
//        myProducerConfig.setFlushOnCheckpoint(true);  // "false" by default
//        */

        env.execute("User management microservice");
    }
}

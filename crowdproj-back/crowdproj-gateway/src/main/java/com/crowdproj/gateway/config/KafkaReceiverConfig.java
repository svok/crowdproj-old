package com.crowdproj.gateway.config;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.listener.KafkaListenerErrorHandler;
import org.springframework.kafka.listener.AbstractMessageListenerContainer.AckMode;

import com.crowdproj.common.events.AbstractEventInternal;
//import com.crowdproj.common.events.system.EventInternalDefault;
import com.crowdproj.gateway.kafka.Receiver;
import com.crowdproj.gateway.kafka.KafkaReceiverErrorHandler;

@Configuration
@EnableKafka
public class KafkaReceiverConfig {

    @Value("${kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Autowired
    public Receiver receiver;


    @Bean
    public Map<String, Object> consumerConfigs() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, Boolean.valueOf(false));
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "gateway");

        return props;
    }

    @Bean
//    public ConsumerFactory<String, AbstractEventInternal> consumerFactory() {
    public ConsumerFactory<String, AbstractEventInternal> consumerFactory() {
        return new DefaultKafkaConsumerFactory<>(
                consumerConfigs(),
                new StringDeserializer(),
//                new JsonDeserializer<>(AbstractEventInternal.class)
                new JsonDeserializer<>(AbstractEventInternal.class)
        );
    }

/*
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, AbstractEventInternal> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, AbstractEventInternal> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        factory.getContainerProperties().setAckMode(AckMode.MANUAL);
        return factory;
    }
*/

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, AbstractEventInternal> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, AbstractEventInternal> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        factory.getContainerProperties().setAckMode(AckMode.MANUAL);
        return factory;
    }

    @Bean
    public KafkaListenerErrorHandler receiverErrorHandler() {
        return new KafkaReceiverErrorHandler();
    }

/*
    @Bean
    public Receiver receiver() {
        return new Receiver();
    }
*/

}

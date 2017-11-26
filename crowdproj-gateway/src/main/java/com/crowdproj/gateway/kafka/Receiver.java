package com.crowdproj.gateway.kafka;

import java.util.concurrent.CountDownLatch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.messaging.Message;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.listener.ListenerExecutionFailedException;
import org.springframework.kafka.listener.KafkaListenerErrorHandler;
import org.springframework.kafka.support.Acknowledgment;

import com.crowdproj.common.events.AbstractEventInternal;

public class Receiver {

    private static final Logger LOG = LoggerFactory.getLogger(Receiver.class);

    private CountDownLatch latch = new CountDownLatch(1);

    public CountDownLatch getLatch() {
        return latch;
    }

    @KafkaListener(topics = "${kafka.topic.json}", errorHandler = "receiverErrorHandler")
    public void receive(AbstractEventInternal event, Acknowledgment ack) {
        LOG.info("received event='{}'", event);
        latch.countDown();
        ack.acknowledge();
    }

}

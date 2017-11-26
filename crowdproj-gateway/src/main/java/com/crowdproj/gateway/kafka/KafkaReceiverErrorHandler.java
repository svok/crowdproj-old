package com.crowdproj.gateway.kafka;

import java.util.concurrent.CountDownLatch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.messaging.Message;
import org.springframework.kafka.listener.ListenerExecutionFailedException;
import org.springframework.kafka.listener.KafkaListenerErrorHandler;
import org.springframework.kafka.support.Acknowledgment;
import org.apache.kafka.clients.consumer.Consumer;

import com.crowdproj.common.events.AbstractEventInternal;
//import com.crowdproj.common.events.system.EventInternalDefault;

public class KafkaReceiverErrorHandler implements KafkaListenerErrorHandler {

    private static final Logger LOG = LoggerFactory.getLogger(Receiver.class);

    public Object handleError(Message<?> message, ListenerExecutionFailedException exception) {
        LOG.error("CrowdProj Kafka Exception: {}", exception);
        return null;
    }
    public Object handleError(Message<?> message, ListenerExecutionFailedException exception, Consumer<?,?> consumer) {
        LOG.error("CrowdProj Kafka Exception with Consumer: {}", exception);
        return null;
    }
}

package com.crowdproj.gateway.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.messaging.Message;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.listener.ListenerExecutionFailedException;
import org.springframework.kafka.listener.KafkaListenerErrorHandler;
import org.springframework.kafka.support.Acknowledgment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.crowdproj.common.events.system.EventInternalDefault;
import com.crowdproj.gateway.repositories.SessionRepository;
import com.crowdproj.gateway.ws.WebSocketMessageBroker;

@Service
@Scope(value = "singleton")
public class Receiver {

    private static final Logger LOG = LoggerFactory.getLogger(Receiver.class);

    @Autowired
    private SessionRepository sessionRepository;


    @KafkaListener(topics = "${kafka.topic.json}", errorHandler = "receiverErrorHandler")
    public void receive(EventInternalDefault event, Acknowledgment ack) {
        LOG.info("received event='{}'", event);

        WebSocketMessageBroker mb = sessionRepository.get(event.getWsSessionId());
        if(mb != null) {
            mb.onMessage(event);
        } else {
            LOG.error("Session {} not found in repository for incoming kafka event: {}", event.getWsSessionId(), event);
        }

        ack.acknowledge();
    }

}

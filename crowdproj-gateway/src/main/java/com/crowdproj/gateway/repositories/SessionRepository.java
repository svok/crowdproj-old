package com.crowdproj.gateway.repositories;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.reactive.socket.WebSocketSession;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import com.crowdproj.gateway.brokers.KafkaBrokerHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.context.ApplicationContext;

@Service
@Scope(value = "singleton")
public class SessionRepository {

    @Autowired
    private ApplicationContext context;

    private static final Map<String, KafkaBrokerHandler> sessions = new HashMap<>();

    public void register(final WebSocketSession session, final KafkaBrokerHandler kafkaHandler) {
        sessions.put(session.getId(), kafkaHandler);
    }

    public void unregister(final WebSocketSession session) {
        sessions.remove(session.getId());
    }

    public KafkaBrokerHandler get(final String id) {
        return sessions.get(id);
    }

    public KafkaBrokerHandler get(final WebSocketSession session) {
        return sessions.get(session.getId());
    }

/*
    @PostConstruct
    public void init(){
        serviceB = (ServiceB) context.getBean("serviceB",customer, reloadType);
    }
*/
}

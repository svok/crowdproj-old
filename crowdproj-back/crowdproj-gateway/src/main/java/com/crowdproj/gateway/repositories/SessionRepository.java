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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.crowdproj.gateway.ws.WebSocketMessageBroker;

@Service
@Scope(value = "singleton")
public class SessionRepository {

    private static final Logger LOG = LoggerFactory.getLogger(SessionRepository.class);

//    @Autowired
//    private ApplicationContext context;

    private static final Map<String, WebSocketMessageBroker> sessions = new HashMap<>();

    public void register(final WebSocketSession session, final WebSocketMessageBroker broker) {
        LOG.info("Registering session {}", session.getId());
        sessions.put(session.getId(), broker);
    }

    public void unregister(final WebSocketSession session) {
        LOG.info("Unregistering session {}", session.getId());
        sessions.remove(session.getId());
    }

//    public WebSocketMessageBroker get(final String sessionId, final String userId) {
    public WebSocketMessageBroker get(final String wsSessionId) {
        LOG.info("Requesting session {}, result: {}", wsSessionId, sessions.get(wsSessionId));
        return sessions.get(wsSessionId);
    }

//    public WebSocketMessageBroker get(final WebSocketSession session, final String userId) {
    public WebSocketMessageBroker get(final WebSocketSession session) {
        return sessions.get(session.getId());
    }

}

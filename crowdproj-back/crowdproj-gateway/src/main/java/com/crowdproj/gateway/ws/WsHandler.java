package com.crowdproj.gateway.ws;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import java.io.IOException;
import java.util.Optional;

import com.crowdproj.gateway.repositories.SessionRepository;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;

@Service
public class WsHandler implements WebSocketHandler {

    private static final Logger LOG = LoggerFactory.getLogger(WsHandler.class);

    private static final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private BeanFactory beanFactory;

    @Autowired
    private WebSocketMessageBrokerFactory webSocketMessageBrokerFactory;

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        LOG.info("############### WsHandler handler for session {}", session.getId());

        // Исходящий поток
        UnicastProcessor<AbstractEventServer> sessionEventPublisher = UnicastProcessor.create();
        Flux<String> sessionOutputEvents = Flux.from(sessionEventPublisher).map(this::serverEventToJson);

        WebSocketMessageBroker subscriber = webSocketMessageBrokerFactory.build(sessionEventPublisher, session);

        // Входящий поток
        session.receive()
            .map(WebSocketMessage::getPayloadAsText)
            .map(mess -> {
                LOG.info("WSH: message received: {}", mess);
                return mess;
            })
            .map(this::jsonToClientEvent)
            .subscribe(subscriber::onSessionNext, subscriber::onSessionError, subscriber::onSessionComplete);
        subscriber.onSessionOpen();

        return session.send(sessionOutputEvents.map(mess -> {
            LOG.info("WSH: message responsed: {}", mess);
            return mess;
        }).map(session::textMessage));
    }


    private AbstractEventClient jsonToClientEvent(String json) {
        try {
            return mapper.readValue(json, AbstractEventClient.class);
        } catch (IOException e) {
            throw new RuntimeException("Invalid JSON:" + json, e);
        }
    }

    private String serverEventToJson(AbstractEventServer event) {
        try {
            return mapper.writeValueAsString(event);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

}

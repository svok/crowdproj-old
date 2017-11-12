package com.crowdproj.gateway.handlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import java.io.IOException;
import java.util.Optional;

import com.crowdproj.gateway.brokers.WebSocketMessageBroker;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;

public class WsHandler implements WebSocketHandler {

    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        System.out.println("############### WsHandler handler for session " + session.getId());

        // Исходящий поток
        UnicastProcessor<AbstractEventServer> sessionEventPublisher = UnicastProcessor.create();
        Flux<String> sessionOutputEvents = Flux.from(sessionEventPublisher).map(this::serverEventToJson);

        WebSocketMessageBroker subscriber = new WebSocketMessageBroker(sessionEventPublisher, session);

        // Входящий поток
        session.receive()
            .map(WebSocketMessage::getPayloadAsText)
            .map(mess -> {
                System.out.println("WSH: message received: " + mess);
                return mess;
            })
            .map(this::jsonToClientEvent)
            .subscribe(subscriber::onSessionNext, subscriber::onSessionError, subscriber::onSessionComplete);
        subscriber.onSessionOpen();

        return session.send(sessionOutputEvents.map(mess -> {
            System.out.println("WSH: message responsed: " + mess);
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

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
//import com.crowdproj.common.events.session.EventSessionOpened;
//import com.crowdproj.common.events.session.EventSessionClosed;

public class WsHandler implements WebSocketHandler {

    private UnicastProcessor<AbstractEventServer> eventPublisher;
    private Flux<String> outputEvents;
    private ObjectMapper mapper;

    public WsHandler(UnicastProcessor<AbstractEventServer> eventPublisher, Flux<AbstractEventServer> events) {
        this.eventPublisher = eventPublisher;
        this.mapper = new ObjectMapper();
        this.outputEvents = Flux.from(events).map(this::serverEventToJson);
        System.out.println("############### WsHandler constructor");
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {
        System.out.println("############### WsHandler handler");
        WebSocketMessageBroker subscriber = new WebSocketMessageBroker(eventPublisher);
        session.receive()
            .map(WebSocketMessage::getPayloadAsText)
            .map(mess -> {
                System.out.println("WSH: message received: " + mess);
                return mess;
            })
            .map(this::jsonToClientEvent)
            .subscribe(subscriber::onSessionNext, subscriber::onSessionError, subscriber::onSessionComplete);
        subscriber.onSessionOpen();
        return session.send(outputEvents.map(session::textMessage));
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

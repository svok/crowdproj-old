package com.crowdproj.gateway.ws;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.context.ApplicationContext;

import org.springframework.web.reactive.socket.WebSocketSession;

import com.crowdproj.common.models.CpSession;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.session.EventSessionOpened;
import com.crowdproj.common.events.session.EventSessionClosed;
import com.crowdproj.common.events.session.EventRequestToken;
import com.crowdproj.common.events.session.EventRegisterToken;
import com.crowdproj.common.events.session.EventNewToken;
import com.crowdproj.common.events.system.EventServerDefault;

import com.crowdproj.gateway.repositories.SessionRepository;
import com.crowdproj.gateway.kafka.Sender;

@Service
public class WebSocketMessageBrokerFactory {

    private static final Logger LOG = LoggerFactory.getLogger(WebSocketMessageBrokerFactory.class);

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private Sender sender;

    public WebSocketMessageBroker build(UnicastProcessor<AbstractEventServer> eventPublisher, WebSocketSession session) {
        WebSocketMessageBroker mb = new WebSocketMessageBroker(eventPublisher, session);
        mb.setSessionRepository(sessionRepository);
        mb.setSender(sender);
        return mb;
    }
}

package com.crowdproj.gateway.handlers;

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

import com.crowdproj.common.user.CpSession;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.session.EventSessionOpened;
import com.crowdproj.common.events.session.EventSessionClosed;
import com.crowdproj.common.events.session.EventRequestToken;
import com.crowdproj.common.events.session.EventRegisterToken;
import com.crowdproj.common.events.session.EventNewToken;
import com.crowdproj.common.events.system.EventServerDefault;
import com.crowdproj.common.events.system.EventError;

import com.crowdproj.gateway.repositories.SessionRepository;
import com.crowdproj.gateway.kafka.Sender;

import com.crowdproj.common.user.CpSession;

@Service
public class WebSocketMessageBrokerFactory {

    private static final Logger LOG = LoggerFactory.getLogger(WebSocketMessageBrokerFactory.class);

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private Sender sender;


    public WebSocketMessageBrokerFactory() {
        try {
            CpSession.getSecretString();
        } catch (Exception e) {
            LOG.error("Cannot init CpSession: {}", e);
        }
    }

    public WebSocketMessageBroker build(UnicastProcessor<AbstractEventServer> eventPublisher, WebSocketSession session) {
        WebSocketMessageBroker mb = new WebSocketMessageBroker(eventPublisher, session);
        mb.setSessionRepository(sessionRepository);
        mb.setSender(sender);
        return mb;
    }
}

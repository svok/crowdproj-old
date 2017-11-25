package com.crowdproj.gateway.brokers;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import com.crowdproj.common.exceptions.UnknownEventException;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.session.EventSessionOpened;
import com.crowdproj.common.events.session.EventSessionClosed;
import com.crowdproj.common.events.system.EventServerDefault;
import com.crowdproj.common.events.system.EventError;

import com.crowdproj.common.user.CpSession;
import com.crowdproj.common.events.AbstractEventInternal;

public class KafkaBrokerHandler implements BrokerHandlerInterface {
    private final WebSocketMessageBroker broker;

    public KafkaBrokerHandler(WebSocketMessageBroker broker) {
        this.broker = broker;
    }

    public void handle(AbstractEventClient event) {
        String sessionId = broker.getSession().getId();
        CpSession cps = broker.getCpSession();

        AbstractEventInternal ei = event.toInternalEvent(sessionId, cps);
    }
}

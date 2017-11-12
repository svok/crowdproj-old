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

public class DefaultBrokerHandler implements BrokerHandlerInterface {
    private final WebSocketMessageBroker broker;
    private final AbstractEventClient event;

    public DefaultBrokerHandler(WebSocketMessageBroker broker, AbstractEventClient event) {
        this.broker = broker;
        this.event = event;
    }

    public void handle() {
        broker.sendToClient(new EventError("Event: " + event.getType() + " cannot be handled"));
    }
}
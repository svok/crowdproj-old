package com.crowdproj.gateway.brokers;

//import reactor.core.publisher.Flux;
//import reactor.core.publisher.Mono;
//import reactor.core.publisher.UnicastProcessor;

import org.springframework.beans.factory.annotation.Autowired;

import com.crowdproj.common.exceptions.UnknownEventException;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.session.EventSessionOpened;
import com.crowdproj.common.events.session.EventSessionClosed;
import com.crowdproj.common.events.system.EventServerDefault;
import com.crowdproj.common.events.system.EventError;

import com.crowdproj.common.user.CpSession;
import com.crowdproj.common.events.AbstractEventInternal;

import com.crowdproj.gateway.kafka.Sender;

public class KafkaBrokerHandler implements BrokerHandlerInterface {

    private final WebSocketMessageBroker broker;

    @Autowired
    private Sender sender;

    public KafkaBrokerHandler(WebSocketMessageBroker broker) {
        this.broker = broker;
    }

    public void handle(AbstractEventClient event) {
        String sessionId = broker.getSession().getId();
        CpSession cps = broker.getCpSession();

        AbstractEventInternal ei = event.toInternalEvent(sessionId, cps);
        sender.send(event.getRoute(), ei);
    }

    public void onMessage(AbstractEventInternal ei) {
        EventServerDefault es = new EventServerDefault();
        es.fromInternalEvent(ei);
        broker.sendToClient(es);
    }
}

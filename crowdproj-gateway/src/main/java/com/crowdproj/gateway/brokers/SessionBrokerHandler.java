package com.crowdproj.gateway.brokers;

import java.io.IOException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import com.crowdproj.common.exceptions.UnknownEventException;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.system.EventError;
import com.crowdproj.common.events.session.EventRequestToken;
import com.crowdproj.common.events.session.EventRegisterToken;
import com.crowdproj.common.events.session.EventNewToken;

import com.crowdproj.common.models.CpSession;

public class SessionBrokerHandler implements BrokerHandlerInterface {
    private final WebSocketMessageBroker broker;
    private final AbstractEventClient event;

    enum SESSION_CLIENT_CLASSES {
        EventRequestToken,
        EventRegisterToken,
        EventError;
    }

    public SessionBrokerHandler(WebSocketMessageBroker broker, AbstractEventClient event) {
        this.broker = broker;
        this.event = event;
    }

    public void handle() {
        SESSION_CLIENT_CLASSES cl;
        try {
            cl = SESSION_CLIENT_CLASSES.valueOf(event.getClass().getSimpleName());
        } catch(IllegalArgumentException e) {
            cl = SESSION_CLIENT_CLASSES.EventError;
        }

        switch(cl) {
        case EventRequestToken:
            CpSession session = CpSession.createNew();
            try {
                broker.sendToClient(new EventNewToken(session.getToken()));
                return;
            } catch(IOException e) {
                System.out.println("Ошибка 500 в " + this.getClass().toString());
            }
            break;
        case EventRegisterToken:
            break;
        default:
            broker.sendToClient(new EventError("Event: " + event.getType() + " cannot be handled"));
            break;
        }
    }
}

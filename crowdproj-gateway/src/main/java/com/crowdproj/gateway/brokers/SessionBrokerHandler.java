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

import com.crowdproj.common.user.CpSession;

public class SessionBrokerHandler implements BrokerHandlerInterface {
    private final WebSocketMessageBroker broker;

    enum SESSION_CLIENT_CLASSES {
        EventRequestToken,
        EventRegisterToken,
        EventError;
    }

    public SessionBrokerHandler(WebSocketMessageBroker broker) {
        this.broker = broker;
    }

    public void handle(AbstractEventClient event) {
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
                broker.setCpSession(session);
                broker.sendToClient(new EventNewToken(session.getToken()));
                return;
            } catch(IOException e) {
                System.out.println("Ошибка 500 в " + this.getClass().toString());
            }
            break;
        case EventRegisterToken:
            try {
                if(! EventRegisterToken.class.isInstance(event)) {
                    broker.sendToClient(new EventError("Event: " + event.getType() + " is wrong"));
                    return;
                }
                EventRegisterToken e = (EventRegisterToken) event;
                String token = e.getToken();
                if(token == null || token == "") {
                    broker.sendToClient(new EventError("Event: " + event.getType() + " has empty 'token' field"));
                    return;
                }
                broker.setCpSession(CpSession.parseToken(token));
                return;
            } catch(IOException e) {
                System.out.println("Ошибка 500 в " + this.getClass().toString());
            }
            break;
        case EventError:
        default:
            broker.sendToClient(new EventError("Event: " + event.getType() + " cannot be handled"));
            break;
        }
    }
}

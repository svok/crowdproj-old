package com.crowdproj.gateway.handlers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.beans.factory.annotation.Autowired;

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

public class WebSocketMessageBroker {

    private static final Logger LOG = LoggerFactory.getLogger(WebSocketMessageBroker.class);

    private final UnicastProcessor<AbstractEventServer> eventPublisher;
    private final WebSocketSession session;
    private CpSession cps = null;

    private SessionRepository sessionRepository;
    private Sender sender;

    enum SESSION_CLIENT_CLASSES {
        EventSessionOpened,
        EventSessionClosed,
        EventRequestToken,
        EventRegisterToken,
        EventError,
        Default;
    }

    public WebSocketMessageBroker(UnicastProcessor<AbstractEventServer> eventPublisher, WebSocketSession session) {
        System.out.println("WSB broker initialized");
        this.eventPublisher = eventPublisher;
        this.session = session;
    }

    public void setCpSession(CpSession cps) {
        this.cps = cps;
    }

    public CpSession getCpSession() {
        return cps;
    }

    public WebSocketSession getSession() {
        return session;
    }

    public void setSessionRepository(final SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public void setSender(final Sender sender) {
        this.sender = sender;
    }

    public void onSessionOpen() {
        System.out.println("WSB session opened");
        if(sessionRepository == null) {
            LOG.error("Crowdproj error: sessionRepository is NULL");
        } else {
            LOG.info("Crowdproj success: sessionRepository is open");
            sessionRepository.register(session, this);
        }
        AbstractEventClient event = new EventSessionOpened();
        event.setType("session.session-opened");
//        eventPublisher.onNext(event);
        onSessionNext(event);
    }

    public void onSessionError(Throwable error) {
        //TODO log error
        System.out.println("WSB session error");
        error.printStackTrace();
    }

    public void onSessionComplete() {
        System.out.println("WSB session close");
        sessionRepository.unregister(session);
        AbstractEventClient event = new EventSessionClosed();
        event.setType("session.session-closed");
//        eventPublisher.onNext(event);
        onSessionNext(event);
    }

    public void onSessionNext(AbstractEventClient event) {

        System.out.println("WSB messageIn: " + event.toString());

        String route = event.getRoute();
        if(route == null || route == "") {
            sendToClient(new EventError("Event: " + event.getType() + " cannot be routed"));
            return;
        }

        SESSION_CLIENT_CLASSES cl;
        try {
            cl = SESSION_CLIENT_CLASSES.valueOf(event.getClass().getSimpleName());
        } catch(IllegalArgumentException e) {
            cl =  SESSION_CLIENT_CLASSES.Default;
        }

        switch(cl) {
        case EventSessionOpened:
        case EventRequestToken:
            cps = CpSession.createNew();
            try {
                sendToClient(new EventNewToken(cps.getToken()));
                return;
            } catch(IOException e) {
                System.out.println("Ошибка 500 в " + this.getClass().toString());
            }
            break;
        case EventRegisterToken:
            try {
                if(! EventRegisterToken.class.isInstance(event)) {
                    sendToClient(new EventError("Event: " + event.getType() + " is wrong"));
                    return;
                }
                EventRegisterToken e = (EventRegisterToken) event;
                String token = e.getToken();
                if(token == null || token == "") {
                    sendToClient(new EventError("Event: " + event.getType() + " has empty 'token' field"));
                    return;
                }
                cps = CpSession.parseToken(token);
                return;
            } catch(IOException e) {
                System.out.println("Ошибка 500 в " + this.getClass().toString());
            }
            break;
        default:
            AbstractEventInternal ei = event.toInternalEvent(session.getId(), cps);
            if(sender == null) {
                System.out.println("Sender is not initialized");
            } else {
                sender.send(route, ei);
            }
            break;
        }

    }

    public void onMessage(AbstractEventInternal ei) {
        EventServerDefault es = new EventServerDefault();
        es.fromInternalEvent(ei);
        sendToClient(es);
    }

    public void sendToClient(AbstractEventServer event) {
        System.out.println("Sending message to client: " + event.toString());
        eventPublisher.onNext(event);
    }

}

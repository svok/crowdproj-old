package com.crowdproj.gateway.ws;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledExecutorService;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.crowdproj.common.models.CpSession;

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
import com.crowdproj.common.events.system.EventInternalDefault;

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
        onSessionNext(event);
    }

    public void onSessionError(Throwable error) {
        //TODO log error
        LOG.error("WSB session error: {}", error);
    }

    public void onSessionComplete() {
        LOG.info("WSB session close");
        sessionRepository.unregister(session);
        AbstractEventClient event = new EventSessionClosed();
        event.setType("session.session-closed");
        onSessionNext(event);
    }

    public void onSessionNext(AbstractEventClient event) {

        LOG.info("WSB: messageIn: {}", event);

        String route = event.getRoute();
        if(route == null || route == "") {
            sendToClient(new EventError().addError("Event: " + event.getType() + " cannot be routed"));
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
            // Такой же как EventRequestToken, но с задержкой
            cps = CpSession.createNew();
            ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);

            Runnable task = () -> {
                try {
                    LOG.info("WSB: Sending new token: {}", cps.getToken());
                    sendToClient(new EventNewToken(cps.getToken()));
                } catch(IOException e) {
                    LOG.error("Cannot send error message to client: {}", e);
                }
            };
            ScheduledFuture<?> future = executor.schedule(task, 25, TimeUnit.MILLISECONDS);
            break;
        case EventRequestToken:
            cps = CpSession.createNew();
            try {
                sendToClient(new EventNewToken(cps.getToken()));
            } catch(IOException e) {
                LOG.error("Cannot send error message to client in {}: {}", this.getClass(), e);
            }
            break;
        case EventRegisterToken:
            try {
                if(! EventRegisterToken.class.isInstance(event)) {
                    sendToClient(new EventError().addError("Event: " + event.getType() + " is wrong"));
                    return;
                }
                EventRegisterToken e = (EventRegisterToken) event;
                String token = e.getToken();
                if(token == null || token == "") {
                    sendToClient(new EventError().addError("Event: " + event.getType() + " has empty 'token' field"));
                    return;
                }
                cps = CpSession.parseToken(token);
                return;
            } catch(IOException e) {
                sendToClient(new EventError().addError("Cannot register token: " + e.getMessage()));
                LOG.error("Token registration error: {}", e);
            }
            break;
        default:
            break;
        }

        EventInternalDefault ei = event.toInternalEvent(session.getId(), cps);
        if(sender == null) {
            LOG.error("Sender is not initialized");
        } else {
            sender.send(route, ei);
        }

    }

    public void onMessage(AbstractEventInternal ei) {
        LOG.info("WSB: Message from Kafka received: {}", ei);
        EventServerDefault es = new EventServerDefault();
        es.fromInternalEvent(ei);
        LOG.info("Sending to client: {}", es);
        sendToClient(es);
    }

    public void sendToClient(AbstractEventServer event) {
        System.out.println("WSB: Sending message to client: " + event.toString());
        eventPublisher.onNext(event);
    }

}

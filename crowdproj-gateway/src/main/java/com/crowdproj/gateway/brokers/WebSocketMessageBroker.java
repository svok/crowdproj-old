package com.crowdproj.gateway.brokers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.crowdproj.common.user.CpSession;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.session.EventSessionOpened;
import com.crowdproj.common.events.session.EventSessionClosed;
import com.crowdproj.common.events.system.EventServerDefault;

import com.crowdproj.gateway.repositories.SessionRepository;

public class WebSocketMessageBroker {

    private static final Logger LOG = LoggerFactory.getLogger(WebSocketMessageBroker.class);

    private final UnicastProcessor<AbstractEventServer> eventPublisher;
    private final WebSocketSession session;
    private final SessionBrokerHandler sbhandler = new SessionBrokerHandler(this);
    private final DefaultBrokerHandler dbhandler = new DefaultBrokerHandler(this);
    private final KafkaBrokerHandler   kfhandler = new KafkaBrokerHandler(this);
    private CpSession cps = null;

    private SessionRepository sessionRepository;

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

    public void setSessionRepository(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public void onSessionOpen() {
        System.out.println("WSB session opened");
        if(sessionRepository == null) {
            LOG.error("Crowdproj error: sessionRepository is NULL");
        } else {
            LOG.info("Crowdproj success: sessionRepository is open");
            sessionRepository.register(session, kfhandler);
        }
//        AbstractEventClient event = new EventSessionOpened();
//        eventPublisher.onNext(event);
    }

    public void onSessionNext(AbstractEventClient event) {
//            lastReceivedEvent = Optional.of(event);

        System.out.println("WSB messageIn: " + event.toString());

        BrokerHandlerInterface bh = getHandler(event);
        bh.handle(event);

/*
        EventServerDefault eventOut = new EventServerDefault("response." + eventIn);
        eventOut.setProperties("content", eventIn.toString());

        System.out.println("WSB messageOut: " + eventOut.toString());
        eventPublisher.onNext(eventOut);
*/
    }

    public void onSessionError(Throwable error) {
        //TODO log error
        System.out.println("WSB session error");
        error.printStackTrace();
    }

    public void onSessionComplete() {
        System.out.println("WSB session close");
        sessionRepository.unregister(session);
//        AbstractEventClient event = new EventSessionClosed();
//        eventPublisher.onNext(event);
    }

    public BrokerHandlerInterface getHandler(AbstractEventClient event) {
        String route = event.getRoute();

        if(route == null) {
            return dbhandler;
        } else if(route.equals("session")) {
            return sbhandler;
        } else {
            return kfhandler;
        }
    }

    public void sendToClient(AbstractEventServer event) {
        System.out.println("Sending message to client: " + event.toString());
        eventPublisher.onNext(event);
    }

}

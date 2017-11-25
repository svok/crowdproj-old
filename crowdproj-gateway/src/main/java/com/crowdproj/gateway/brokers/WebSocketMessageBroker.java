package com.crowdproj.gateway.brokers;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import org.springframework.web.reactive.socket.WebSocketSession;

import com.crowdproj.common.user.CpSession;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.session.EventSessionOpened;
import com.crowdproj.common.events.session.EventSessionClosed;
import com.crowdproj.common.events.system.EventServerDefault;

public class WebSocketMessageBroker {
    private final UnicastProcessor<AbstractEventServer> eventPublisher;
    private final WebSocketSession session;
    private final SessionBrokerHandler sbhandler = new SessionBrokerHandler(this);
    private final DefaultBrokerHandler dbhandler = new DefaultBrokerHandler(this);
    private CpSession cps = null;

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

    public void onSessionOpen() {
        System.out.println("WSB session opened");
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
//        AbstractEventClient event = new EventSessionClosed();
//        eventPublisher.onNext(event);
    }

    public BrokerHandlerInterface getHandler(AbstractEventClient event) {
        String route = event.getRoute();

        if(route.equals("session")) {
            return sbhandler;
        }
        return dbhandler;
    }

    public void sendToClient(AbstractEventServer event) {
        System.out.println("Sending message to client: " + event.toString());
        eventPublisher.onNext(event);
    }

}

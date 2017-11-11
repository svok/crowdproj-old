package com.crowdproj.gateway.brokers;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.session.EventSessionOpened;
import com.crowdproj.common.events.session.EventSessionClosed;
import com.crowdproj.common.events.system.EventServerDefault;

public class WebSocketMessageBroker {
    private UnicastProcessor<AbstractEventServer> eventPublisher;

    public WebSocketMessageBroker(UnicastProcessor<AbstractEventServer> eventPublisher) {
        System.out.println("WSB broker initialized");
        this.eventPublisher = eventPublisher;
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
        bh.handle();

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

/*
        if(route.equals("session")) {
            return new SessionBrokerHandler(this, event);
        }
*/
        return new DefaultBrokerHandler(this, event);
    }

    public void sendToClient(AbstractEventServer event) {
        System.out.println("Sending message to client: " + event.toString());
        eventPublisher.onNext(event);
    }

}

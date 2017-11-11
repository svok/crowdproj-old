package com.crowdproj.gateway.brokers;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.session.EventSessionOpened;
import com.crowdproj.common.events.session.EventSessionClosed;
import com.crowdproj.common.events.EventServerDefault;

public class WebSocketMessageBroker {
    private UnicastProcessor<AbstractEventServer> eventPublisher;
//        private Optional<AbstractEventClient> lastReceivedEvent = Optional.empty();

    public WebSocketMessageBroker(UnicastProcessor<AbstractEventServer> eventPublisher) {
        System.out.println("WSB broker initialized");
        this.eventPublisher = eventPublisher;
    }

    public void onSessionOpen() {
        System.out.println("WSB session opened");
//        AbstractEventClient event = new EventSessionOpened();
//        eventPublisher.onNext(event);
    }

    public void onSessionNext(AbstractEventClient eventIn) {
//            lastReceivedEvent = Optional.of(event);

        System.out.println("WSB messageIn: " + eventIn.toString());

        EventServerDefault eventOut = new EventServerDefault("response." + eventIn);
        eventOut.setProperties("content", eventIn.toString());

        System.out.println("WSB messageOut: " + eventOut.toString());
        eventPublisher.onNext(eventOut);
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

}

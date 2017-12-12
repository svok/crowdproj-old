package com.crowdproj.echo;

import org.apache.flink.api.common.functions.MapFunction;

import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.echo.EventEcho;

class Updater implements MapFunction<AbstractEventInternal, AbstractEventInternal> {

    @Override
    public AbstractEventInternal map(AbstractEventInternal event) throws Exception {
        System.out.println("Updater: " + event);
        event.setType("echo.response: ");
        if(event instanceof EventEcho) {
            ((EventEcho)event).setProperty("class", event.getClass().getName());
        }
        return event;
    }
}
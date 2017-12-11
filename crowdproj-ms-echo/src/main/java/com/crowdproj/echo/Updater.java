package com.crowdproj.echo;

import com.crowdproj.common.events.AbstractEventInternal;
import org.apache.flink.api.common.functions.MapFunction;

class Updater implements MapFunction<AbstractEventInternal, AbstractEventInternal> {

    @Override
    public AbstractEventInternal map(AbstractEventInternal event) throws Exception {
        System.out.println("Updater: " + event);
        event.setType("echo.response: ");
        event.setProperty("class", event.getClass().getName());
        return event;
    }
}
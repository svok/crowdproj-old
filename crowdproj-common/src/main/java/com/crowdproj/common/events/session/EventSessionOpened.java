package com.crowdproj.common.events.session;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.events.AbstractEventClient;

public class EventSessionOpened extends AbstractEventClient {

    @JsonCreator
    public EventSessionOpened() {
    }

}

package com.crowdproj.common.events.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.user.Signin;

public class EventRequestToken extends AbstractEventClient {

    protected String token;

    @JsonCreator
    public EventRequestToken() {
//        super("user.rquest");
    }

}

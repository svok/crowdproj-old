package com.crowdproj.common.events.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.user.Signin;

public class EventOpenSession extends AbstractEventClient {

    protected String token;

    @JsonCreator
//    public EventSignin(@JsonProperty("type") String type, @JsonProperty("signin") Signin signin) {
    public EventOpenSession(@JsonProperty("token") String token) {
        setToken(token);
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

}

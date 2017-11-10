package com.crowdproj.common.events.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.user.Signin;

public class EventNewToken extends AbstractEventServer {

    protected String token;

    @JsonCreator
    public EventNewToken(@JsonProperty("token") String token) {
        setToken(token);
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public String toString() {
        return super.toString()
            + "    token=" + (token == null ? "null" : "\"" + token + "\"") + "\n"
        ;
    }
}

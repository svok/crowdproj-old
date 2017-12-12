package com.crowdproj.common.events.session;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.system.EventInternalDefault;

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

    public void fromInternalEvent(EventInternalDefault event) {
    }

    public String toString() {
        return super.toString()
            + "    token=" + (token == null ? "null" : "\"" + token + "\"") + "\n"
        ;
    }
}

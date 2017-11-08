package com.crowdproj.common.events.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.user.UserInfo;

public class EventCredentials extends AbstractEventServer {

    protected UserInfo user;

    @JsonCreator
    public EventCredentials(@JsonProperty("user") UserInfo user) {
        super("user.credentials");
        setUser(user);
    }

    public void setUser(UserInfo user) {
        this.user = user;
    }

    public UserInfo getUser() {
        return user;
    }

}

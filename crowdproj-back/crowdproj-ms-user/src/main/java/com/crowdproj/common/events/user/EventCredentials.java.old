package com.crowdproj.common.events.user;

import java.lang.ClassCastException;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.user.UserInfo;

public class EventCredentials extends AbstractEventServer {

    protected UserInfo user;

    @JsonCreator
    public EventCredentials(@JsonProperty("user") UserInfo user) {
//        super("user.credentials");
        setUser(user);
    }

    public void setUser(UserInfo user) {
        this.user = user;
    }

    public UserInfo getUser() {
        return user;
    }

    public void fromInternalEvent(AbstractEventInternal event) {
        try {
            this.setUser((UserInfo) event.getProperty("user"));
        } catch(ClassCastException e) {
        }
    }

    public String toString() {
        return super.toString()
            + "    user" + (user == null ? "null" : "\"" + user.toString() + "\"") + "\n"
        ;
    }
}

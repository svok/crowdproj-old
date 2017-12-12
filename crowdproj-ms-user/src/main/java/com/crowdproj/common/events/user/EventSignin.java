package com.crowdproj.common.events.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.models.CpSession;
import com.crowdproj.common.events.AbstractEventInternal;

public class EventSignin extends AbstractEventInternal {

    protected String identity;
    protected String password;

    public EventSignin() {
        super();
    }

    @JsonCreator
    public EventSignin(@JsonProperty("identity") String identity, @JsonProperty("password") String password) {
        setIdentity(identity);
        setPassword(password);
    }

    // --- email -----
    public String getIdentity() {
        return identity;
    }

    public EventSignin setIdentity(String identity) {
        this.identity = identity;
        return this;
    }

    // passwords
    public String getPassword() {
        return password;
    }

    public EventSignin setPassword(String password) {
        this.password = password;
        return this;
    }

    @Override
    public String toString() {
        return super.toString()
            + "    identity=" + identity
            + "\n    password=" + password
            + "\n";
    }

}

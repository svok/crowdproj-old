package com.crowdproj.common.events.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.user.CpSession;
import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.user.Signin;

public class EventSignin extends AbstractEventClient {

    protected Signin signin;

    @JsonCreator
    public EventSignin(@JsonProperty("signin") Signin signin) {
        setSignin(signin);
    }

    public void setSignin(Signin signin) {
        this.signin = signin;
    }

    public Signin getSignin() {
        return signin;
    }

    public AbstractEventInternal toInternalEvent(String sessionId, CpSession cps) {
        AbstractEventInternal e = super.toInternalEvent(sessionId, cps);
        e.setProperty("signin", signin);
        return e;
    }

    public String toString() {
        return super.toString()
            + "    signin=" + (signin == null ? "null" : "\"" + signin.toString() + "\"") + "\n"
        ;
    }

}

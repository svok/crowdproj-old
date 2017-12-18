package com.crowdproj.common.events.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.models.CpSession;
import com.crowdproj.common.events.AbstractEventInternal;

public class EventSignup extends AbstractEventInternal {

    protected String contact;

    public EventSignup() {
        super();
    }

    @JsonCreator
    public EventSignup(@JsonProperty("contact") String identity) {
        setContact(contact);
    }

    public String getContact() {
        return contact;
    }

    public EventSignup setContact(String contact) {
        this.contact = contact;
        return this;
    }

    @Override
    public String toString() {
        return super.toString()
            + "    contact=" + contact
            + "\n";
    }

}

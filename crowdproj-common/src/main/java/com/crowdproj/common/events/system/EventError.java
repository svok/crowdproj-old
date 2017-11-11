package com.crowdproj.common.events.system;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;

public class EventError extends AbstractEventServer {

    protected String error;

    public EventError(@JsonProperty("error") String error) {
        super();
        setError(error);
    }

    public String getError() {
        return error;
    }

    public void setError(String error){
        this.error = error;
    }

    public String toString() {
        return super.toString()
            + "    error=" + (error == null ? "null" : "\"" + error + "\"") + "\n"
        ;
    }

}

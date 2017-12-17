package com.crowdproj.common.events.system;

import java.util.List;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.AbstractEventInternal;

import com.crowdproj.common.models.Error;

public class EventError extends AbstractEventServer {

    protected List<Error> errors = null;

    public EventError() {
        super();
    }

    public List<Error> getErrors() {
        return errors;
    }

    public EventError setErrors(List<Error> errors){
        this.errors = errors;
        return this;
    }

    public EventError addError(Error error){
        if(errors == null) {
            errors = new ArrayList<>();
        }
        this.errors.add(error);
        return this;
    }

    public EventError addError(String message){
        Error error = new Error().setError(message);
        return addError(error);
    }

    public EventError addError(String message, String field){
        Error error = new Error().setError(message).setField(field);
        return addError(error);
    }

    public EventError addError(String message, String field, String component){
        Error error = new Error().setError(message).setField(field).setComponent(component);
        return addError(error);
    }

    public void fromInternalEvent(AbstractEventInternal event) {
        if(event instanceof EventErrorInternal) {
            this.setErrors(((EventErrorInternal)event).getErrors());
        } else {
            throw new IllegalArgumentException("EventError must be created from EventErrorInternal. "
                + "Other subclasses of AbstractEventInternal are not allowed.");
        }
    }

    public String toString() {
        return super.toString()
            + "    errors=" + (errors == null ? "null" : "\"" + errors + "\"") + "\n"
        ;
    }

}

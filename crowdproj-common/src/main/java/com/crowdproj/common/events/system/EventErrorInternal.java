package com.crowdproj.common.events.system;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import com.crowdproj.common.events.AbstractEvent;
import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.AbstractEventInternal;

import com.crowdproj.common.models.Error;

public class EventErrorInternal extends AbstractEventInternal {

    protected String related;
    protected List<Error> errors = null;


    public EventErrorInternal() {
        super();
    }

    @JsonCreator
    public EventErrorInternal(
        @JsonProperty("related") String related,
        @JsonProperty("id") String id,
        @JsonProperty("tsCreated") Long tsCreated
    ) {
        super(AbstractEvent.calcType(EventErrorInternal.class), id, tsCreated);
    }

    public String getRelated() {
        return related;
    }

    public EventErrorInternal setRelated(String related) {
        this.related = related;
        return this;
    }

    // Errors
    public List<Error> getErrors() {
        return errors;
    }

    public EventErrorInternal setErrors(List<Error> errors) {
        this.errors = errors;
        return this;
    }

    public EventErrorInternal addError(Error error) {
        if(errors == null) {
            errors = new ArrayList<Error>();
        }
        errors.add(error);
        return this;
    }

    public EventErrorInternal addError(String message){
        Error error = new Error().setError(message);
        return addError(error);
    }

    public EventErrorInternal addError(String message, String field){
        Error error = new Error().setError(message).setField(field);
        return addError(error);
    }

    public EventErrorInternal addError(String message, String field, String component){
        Error error = new Error().setError(message).setField(field).setComponent(component);
        return addError(error);
    }

    public String toString() {
        return new StringBuilder(1024)
            .append(super.toString())
//            .append("\n")
            .append("    related=")
            .append(related)
            .append("\n")
            .append("    errors=")
            .append(errors)
            .append("\n")
            .toString()
        ;
    }

}

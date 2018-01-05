package com.crowdproj.common.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Error {

    private String error;
    private String component;
    private String field;

    public Error() {}

    @JsonCreator
    public Error(@JsonProperty("error") final String error) {
        setError(error);
    }

    // message
    public Error setError(String error) {
        this.error = error;
        return this;
    }

    public String getError() {
        return error;
    }

    // component
    public Error setComponent(String component) {
        this.component = component;
        return this;
    }

    public String getComponent() {
        return component;
    }

    // field
    public Error setField(String field) {
        this.field = field;
        return this;
    }

    public String getField() {
        return field;
    }

    @Override
    public String toString() {
        return new StringBuilder(1024)
            .append("Error[")
            .append("component=")
            .append(component)
            .append(",field=")
            .append(field)
            .append(",error=")
            .append(error)
            .toString()
        ;
    }

}

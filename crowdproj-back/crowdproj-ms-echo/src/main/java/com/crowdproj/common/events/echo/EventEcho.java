package com.crowdproj.common.events.echo;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import java.util.stream.Collectors;

//import com.crowdproj.common.models.CpSession;
import com.crowdproj.common.events.AbstractEventInternal;

public class EventEcho extends AbstractEventInternal {

    protected Map<String, Object> properties = null;

    public EventEcho() {
        super();
    }

    @JsonCreator
    public EventEcho(
        @JsonProperty("type") String type,
        @JsonProperty("id") String id,
        @JsonProperty("tsCreated") Long tsCreated
    ) {
        super(type, id, tsCreated);
    }

    // Other properties
    @JsonIgnore
    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }

    @JsonAnySetter
    public void setProperty(String name, Object value) {
        if(properties == null) {
            properties = new HashMap<>();
        }
        properties.put(name, value);
    }

    @JsonAnyGetter
    public Map<String, Object> getProperties(){
        return properties;
    }

    public Object getProperty(String name) {
        if(properties == null) {
            return null;
        }
        return properties.get(name);
    }

    public String toString() {
        return new StringBuilder(1024)
            .append(super.toString())
            .append("\n")
            .append("    properties=")
            .append(properties)
            .toString()
        ;
    }

}

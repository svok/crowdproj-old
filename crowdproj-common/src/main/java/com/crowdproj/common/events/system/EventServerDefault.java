package com.crowdproj.common.events.system;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import java.util.stream.Collectors;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.AbstractEventInternal;

public class EventServerDefault extends AbstractEventServer {

    protected Map<String, Object> properties = null;

    public EventServerDefault() {
        super();
    }

    @JsonCreator
    public EventServerDefault(@JsonProperty("type") String type) {
        super();
        setType(type);
    }

    @JsonIgnore
    public String getType() {
        return super.getType();
    }

    public void setProperties(Map<String, Object> properties){
        this.properties = properties;
    }

    @JsonAnySetter
    public void setProperty(String name, Object value){
        if(properties == null) {
            properties = new HashMap<>();
        }
        properties.put(name, value);
    }

    @JsonAnyGetter
    public Map<String, Object> getProperties(){
        return properties;
    }

    public void fromInternalEvent(AbstractEventInternal event) {
        EventInternalDefault ev = (EventInternalDefault) event;
        this.setType(ev.getType());
        this.setProperties(ev.getProperties());
    }

    public String toString() {
        return super.toString()
            + properties
            .entrySet()
            .stream()
            .map(set -> "    prop["+set.getKey()+"]=\"" + set.getValue().toString() + "\"\n")
            .collect(Collectors.joining(""))
        ;
    }

}

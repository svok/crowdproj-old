package com.crowdproj.common.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import java.util.stream.Collectors;

public class EventServerDefault extends AbstractEventServer {

    protected Map<String, Object> properties = new HashMap<>();

//*
    public EventServerDefault(@JsonProperty("type") String type) {
        super();
        setType(type);
    }
//*/

    @JsonIgnore
    public String getType() {
        return super.getType();
    }

    @JsonAnySetter
    public void setProperties(String name, Object value){
        properties.put(name, value);
    }

    @JsonAnyGetter
    public Map<String, Object> getProperties(){
        return properties;
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

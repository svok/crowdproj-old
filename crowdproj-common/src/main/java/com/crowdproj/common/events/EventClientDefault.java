package com.crowdproj.common.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class EventClientDefault extends AbstractEventClient {

    protected Map<String, Object> properties = new HashMap<>();

    @JsonCreator
//    public EventClientDefault(@JsonProperty("type") String type) {
    public EventClientDefault() {
//        super(type);
        super();
    }

    @JsonAnySetter
    public void setProperties(String name, Object value){
        properties.put(name, value);
    }

    @JsonAnyGetter
    public Map<String, Object> getProperties(){
        return properties;
    }

}

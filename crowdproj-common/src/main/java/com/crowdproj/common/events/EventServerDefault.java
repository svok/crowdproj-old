package com.crowdproj.common.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class EventServerDefault extends AbstractEventServer {

    protected Map<String, Object> properties = new HashMap<>();

    @JsonCreator
//    public EventServerDefault(@JsonProperty("type") String type) {
//        super(type);
    public EventServerDefault() {
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

package com.crowdproj.common.events;

import com.fasterxml.jackson.annotation.JsonTypeId;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

abstract public class AbstractEvent {

    protected String type_id;

//    @JsonTypeId
    public void setType(String type) {
        this.type_id = type;
    }

//    @JsonTypeId
    public String getType() {
        return type_id;
    }

    public String getRoute() {
        if(type_id == null) return null;

        int pos = type_id.lastIndexOf(".");
        return type_id.substring(0, pos > 0 ? pos : 0);
    }

    public String toString() {
        return getClass().getName() + ": \n"
            + "    type=" + (type_id == null ? "null" : "\""+type_id+"\"") + "\n"
        ;
    }

}

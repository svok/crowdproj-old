package com.crowdproj.common.events;

abstract public class AbstractEvent {

    protected String type;

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

}

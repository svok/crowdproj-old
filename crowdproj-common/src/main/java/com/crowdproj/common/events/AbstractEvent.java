package com.crowdproj.common.events;

abstract public class AbstractEvent {
    private String type;

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

}

package com.crowdproj.common.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
//import com.fasterxml.jackson.annotation.JsonInclude.Include.*;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.concurrent.atomic.AtomicInteger;

@JsonInclude(Include.NON_NULL)
public class Event {
/*
    public enum Type {
        CHAT_MESSAGE, USER_JOINED, USER_STATS, USER_LEFT;
    }
*/

    private static AtomicInteger ID_GENERATOR = new AtomicInteger(0);


    private String type;

    private final int id;

    private Payload payload;

    private final long timestamp;



    @JsonCreator
    public Event(@JsonProperty("type") String type,
                 @JsonProperty("payload") Payload payload) {
        this.type = type;
        this.payload = payload;
        this.id = ID_GENERATOR.addAndGet(1);
        this.timestamp = System.currentTimeMillis();
    }


    public String getType() {
        return type;
    }

    public Payload getPayload() {
        return payload;
    }

    @JsonIgnore
    public CpSession getSession(){
        return getPayload().getSession();
    }

    public int getId() {
        return id;
    }


    public long getTimestamp() {
        return timestamp;
    }

    public static EventBuilder type(String type) {
        return new EventBuilder().type(type);
    }
}

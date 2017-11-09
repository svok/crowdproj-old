package com.crowdproj.common.events;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonTypeIdResolver;

import java.util.concurrent.atomic.AtomicInteger;

@JsonInclude(Include.NON_NULL)
@JsonTypeInfo(
    use = JsonTypeInfo.Id.CUSTOM,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type")
@JsonTypeIdResolver(EventTypeIdResolver.class)
abstract public class AbstractEventServer extends AbstractEvent {
    private static AtomicInteger ID_GENERATOR = new AtomicInteger(0);

    private final int id;

    private final long timestamp;

    @JsonCreator
//    public AbstractEventServer(@JsonProperty("type") String type) {
    public AbstractEventServer() {
        setType(type);
        this.id = ID_GENERATOR.addAndGet(1);
        this.timestamp = System.currentTimeMillis();
    }


    public int getId() {
        return id;
    }


    public long getTimestamp() {
        return timestamp;
    }

}

package com.crowdproj.common.events;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonTypeIdResolver;

import java.util.concurrent.atomic.AtomicInteger;
import com.crowdproj.common.events.system.EventInternalDefault;

@JsonInclude(Include.NON_NULL)
@JsonTypeInfo(
    use = JsonTypeInfo.Id.CUSTOM,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type",
    visible = true
)
@JsonTypeIdResolver(EventTypeIdResolver.class)
abstract public class AbstractEventServer extends AbstractEvent {
    private static AtomicInteger ID_GENERATOR = new AtomicInteger(0);

    private final Integer id;

    private final Long timestamp;

    public AbstractEventServer() {
        this.id = ID_GENERATOR.addAndGet(1);
        this.timestamp = System.currentTimeMillis();
    }

    abstract public void fromInternalEvent(AbstractEventInternal event);

    public int getId() {
        return id;
    }


    public long getTimestamp() {
        return timestamp;
    }

    public String toString() {
        return super.toString()
            + "    id=" + (id == null ? "null" : "\"" + id + "\"") + "\n"
            + "    timestamp=" + (timestamp == null ? "null" : "\"" + Long.toString(timestamp) + "\"") + "\n"
        ;
    }

}

package com.crowdproj.common.events;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonTypeIdResolver;

import java.util.concurrent.atomic.AtomicInteger;

import com.crowdproj.common.models.CpSession;
import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.system.EventInternalDefault;

@JsonInclude(Include.NON_NULL)
@JsonTypeInfo(
    use = JsonTypeInfo.Id.CUSTOM,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type",
    visible = true
)
@JsonTypeIdResolver(EventTypeIdResolver.class)
abstract public class AbstractEventClient extends AbstractEvent {

    public AbstractEventInternal toInternalEvent(String wsSessionId, CpSession cps) {
        EventInternalDefault e = new EventInternalDefault();
        e.setType(this.getType());
        e.setStatus("message", "received_from_client");
        e.setCpSession(cps);
        e.setWsSessionId(wsSessionId);

        return e;
    }

}

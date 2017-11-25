package com.crowdproj.common.events;

import java.lang.StringBuilder;

import java.util.Map;
import java.util.HashMap;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.databind.annotation.JsonTypeIdResolver;

import com.crowdproj.common.user.CpSession;

@JsonInclude(Include.NON_NULL)
@JsonTypeInfo(
    use = JsonTypeInfo.Id.CUSTOM,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type",
    visible = true
)
@JsonTypeIdResolver(EventTypeIdResolver.class)
abstract public class AbstractEventInternal extends AbstractEvent {

    protected final String id;
    protected final Long tsCreated;
    protected String sessionId;
    protected CpSession cpSession;
    protected Map<String, Object> statuses = null;
    protected Map<String, Object> properties = null;

    public AbstractEventInternal() {
        super();
        id = UUID.randomUUID().toString();
        tsCreated = System.currentTimeMillis();
    }

    @JsonCreator
    public AbstractEventInternal(
        @JsonProperty("type") String type,
        @JsonProperty("id") String id,
        @JsonProperty("tsCreated") Long tsCreated
    ) {
        super();
        setType(type);
        this.id = id;
        this.tsCreated = tsCreated;
    }

    // Type
    @JsonIgnore
    public String getType() {
        return super.getType();
    }

    @JsonIgnore
    public void setType(String type) {
        super.setType(type);
    }

    // Id
    public String getId() {
        return id;
    }

    // TsCreated
    public long getTsCreated() {
        return tsCreated;
    }

    // sessionId
    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    // cpSession
    public CpSession getCpSession() {
        return cpSession;
    }

    public void setCpSession(CpSession cpSession) {
        this.cpSession = cpSession;
    }

    // Statuses
    public Map<String, Object> getStatuses() {
        return statuses;
    }

    public void setStatuses(Map<String, Object> statuses) {
        this.statuses = statuses;
    }

    @JsonIgnore
    public Object getStatus(String key) {
        return statuses == null ? null : statuses.get(key);
    }

    @JsonIgnore
    public void setStatus(String key, Object val) {
        if(statuses == null) {
            statuses = new HashMap<String, Object>();
        }
        statuses.put(key, val);
    }

    // Other properties
    @JsonIgnore
    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }

    @JsonAnySetter
    public void setProperty(String name, Object value) {
        if(properties == null) {
            properties = new HashMap<>();
        }
        properties.put(name, value);
    }

    @JsonAnyGetter
    public Map<String, Object> getProperties(){
        return properties;
    }

    public Object getProperty(String name) {
        if(properties == null) {
            return null;
        }
        return properties.get(name);
    }

    public String toString() {
        StringBuilder sb = new StringBuilder(1024)
            .append(super.toString())
            .append("id=")
            .append(id)
            .append("\n")
            .append("tsCreated=")
            .append(tsCreated)
            .append("\n")
            .append("sessionId=")
            .append(sessionId)
            .append("\n")
            .append("statuses=")
            .append(statuses)
            .append("\n")
            .append("properties=")
            .append(properties)
            .append("\n")
        ;

        return sb.toString();
    }
}

package com.crowdproj.common.events.system;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import java.util.stream.Collectors;

import com.crowdproj.common.user.CpSession;
import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.AbstractEventInternal;

public class EventInternalDefault extends AbstractEventInternal {

    public EventInternalDefault() {
        super();
    }

    @JsonCreator
    public EventInternalDefault(
        @JsonProperty("type") String type,
        @JsonProperty("id") String id,
        @JsonProperty("tsCreated") Long tsCreated
    ) {
        super(type, id, tsCreated);
    }

}

package com.crowdproj.common.events.echo;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import java.util.stream.Collectors;

//import com.crowdproj.common.models.CpSession;
import com.crowdproj.common.events.AbstractEventInternal;

public class EventEcho extends AbstractEventInternal {

    public EventEcho() {
        super();
    }

    @JsonCreator
    public EventEcho(
        @JsonProperty("type") String type,
        @JsonProperty("id") String id,
        @JsonProperty("tsCreated") Long tsCreated
    ) {
        super(type, id, tsCreated);
    }

}

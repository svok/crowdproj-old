package com.crowdproj.common.nodes;

import com.crowdproj.common.events.AbstractEventInternal;
import org.apache.flink.api.common.functions.MapFunction;

import com.fasterxml.jackson.databind.ObjectMapper;

public class FromJson implements MapFunction<String, AbstractEventInternal> {

    final ObjectMapper mapper = new ObjectMapper();

    @Override
    public AbstractEventInternal map(String json) throws Exception {
        AbstractEventInternal event = mapper.readValue(json, AbstractEventInternal.class);
        System.out.println("FromJson: " + event);
        return event;
    }
}
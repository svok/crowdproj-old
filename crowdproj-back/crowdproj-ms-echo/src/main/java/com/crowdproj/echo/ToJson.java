package com.crowdproj.echo;

import com.crowdproj.common.events.AbstractEventInternal;
import org.apache.flink.api.common.functions.MapFunction;

import com.fasterxml.jackson.databind.ObjectMapper;

class ToJson implements MapFunction<AbstractEventInternal, String> {

    final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String map(AbstractEventInternal event) throws Exception {
        System.out.println("ToJson: " + event);
        String json = mapper.writeValueAsString(event);
        return json;
    }
}
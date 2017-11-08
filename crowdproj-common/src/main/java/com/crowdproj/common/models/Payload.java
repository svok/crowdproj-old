package com.crowdproj.common.models;

import java.io.IOException;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
//import com.fasterxml.jackson.annotation.JsonInclude.Include.*;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@JsonInclude(Include.NON_NULL)
public class Payload {

    private CpSession session;

    private Map<String, Object> properties = new HashMap<>();

    public Payload(CpSession session, Map<String, Object> properties){
        this.session = session;
        this.properties = properties;
    }
    @JsonCreator
    private Payload(@JsonProperty("jwtToken") String token) throws IOException {
        this.session = CpSession.parseToken(token);
    }

    @JsonIgnore
    public CpSession getSession() {
        return session;
    }

    @JsonGetter("jwtToken")
    public String getJwtToken() throws IOException {
        return session.getToken();
    }

    @JsonAnySetter
    private void setProperties(String name, Object value){
        properties.put(name, value);
    }

    @JsonAnyGetter
    private Map<String, Object> getProperties(){
        return properties;
    }

}

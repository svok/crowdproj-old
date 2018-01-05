package com.crowdproj.common.events;

import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.UUID;
import java.util.List;
import java.util.Arrays;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
//import com.crowdproj.common.events.user.EventSignin;
//import com.crowdproj.common.events.user.EventCredentials;
import com.crowdproj.common.events.session.EventNewToken;
import com.crowdproj.common.events.system.EventClientDefault;
import com.crowdproj.common.events.system.EventServerDefault;
import com.crowdproj.common.events.system.EventError;

import com.crowdproj.common.models.Error;

//import com.crowdproj.common.user.Signin;
//import com.crowdproj.common.user.UserInfo;

import org.junit.Test;
import org.junit.runner.RunWith;

public class EventsTest {

    private final ObjectMapper mapper = new ObjectMapper();


    protected static final String jsonNewToken = "{\"type\":\"session.new-token\",\"token\":\"This is a client token\"}";
    protected static final String jsonDefaultClient = "{\"type\":\"default.client\",\"default\":\"Some default\",\"client\":\"some client\"}";
    protected static final String jsonDefaultServer = "{\"type\":\"default.server\",\"default\":\"Some default\",\"server\":\"some server\"}";
    protected static final String jsonError = "{\"type\":\"system.error\",\"errors\":[{\"error\":\"Some error\",\"component\":\"user-page\",\"field\":\"password\"}]}";

    @Test
    public void testJsonToNewToken() throws IOException {
        AbstractEventServer event = mapper.readValue(jsonNewToken, AbstractEventServer.class);

        System.out.println("EventNewToken class: " + event.toString());
        assert event instanceof EventNewToken;
        assert event.getRoute().equals("session");
        assert event.getType().equals("session.new-token");
    }

    @Test
    public void testNewTokenToJson() throws IOException {
        AbstractEventServer event = new EventNewToken("This is very big token 0987098ullkhlkjhlkjhlkjhl");
        String json = mapper.writeValueAsString(event);

        System.out.println("EventNewToken json conversion string: " + json);
        assert json.contains("\"session.new-token\"");
    }

    @Test
    public void testJsonToDefaultClient() throws IOException {
        AbstractEventClient event = mapper.readValue(jsonDefaultClient, AbstractEventClient.class);

        System.out.println("EventClientDefault class: " + event.toString());
        assert event instanceof EventClientDefault;
        assert event.getType().equals("default.client");
        assert ((EventClientDefault)event).getProperties().get("client").equals("some client");
    }

    @Test
    public void testDefaultClientToJson() throws IOException {
        AbstractEventClient event = new EventClientDefault("default.client");
        String json = mapper.writeValueAsString(event);

        System.out.println("EventClientDefault json conversion string: " + json);
        assert json.contains("\"default.client\"");
    }

    @Test
    public void testJsonToDefaultServer() throws IOException {
        AbstractEventServer event = mapper.readValue(jsonDefaultServer, AbstractEventServer.class);

        System.out.println("EventServerDefault class: " + event.toString());
        assert event instanceof EventServerDefault;
        assert event.getType().equals("default.server");
        assert ((EventServerDefault)event).getProperties().get("server").equals("some server");
    }

    @Test
    public void testDefaultServerToJson() throws IOException {
        AbstractEventServer event = new EventServerDefault("default.server");
        String json = mapper.writeValueAsString(event);

        System.out.println("EventServerDefault json conversion string: " + json);
        assert json.contains("\"default.server\"");
    }

    @Test
    public void testJsonToError() throws IOException {
        AbstractEventServer event = mapper.readValue(jsonError, AbstractEventServer.class);

        System.out.println("EventError class: " + event.toString());
        assert event instanceof EventError;
        assert event.getType().equals("system.error");
        assert ((EventError)event).getErrors() instanceof List;
        assert ((EventError)event).getErrors().get(0) instanceof Error;
        assert ((EventError)event).getErrors().get(0).getError().equals("Some error");
    }

    @Test
    public void testErrorToJson() throws IOException {
        AbstractEventServer event = new EventError().setErrors(
            Arrays.asList(new Error().setError("Some error").setComponent("some-component").setField("some-field"))
        );
        String json = mapper.writeValueAsString(event);

        System.out.println("EventError json conversion string: " + json);
        assert json.contains("\"system.error\"");
    }

}

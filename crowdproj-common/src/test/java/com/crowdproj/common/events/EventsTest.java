package com.crowdproj.common.events;

import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.UUID;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.user.EventSignin;
import com.crowdproj.common.events.user.EventCredentials;
import com.crowdproj.common.events.session.EventNewToken;
import com.crowdproj.common.events.EventClientDefault;
import com.crowdproj.common.events.EventServerDefault;

import com.crowdproj.common.user.Signin;
import com.crowdproj.common.user.UserInfo;

import org.junit.Test;
import org.junit.runner.RunWith;

public class EventsTest {

    private final ObjectMapper mapper = new ObjectMapper();


    protected static final String jsonSignin = "{\"type\":\"user.signin\",\"signin\":{\"email\":\"one@two.tree\",\"password\":\"secret\"}}";
    protected static final String jsonCredentials = "{\"type\":\"user.credentials\",\"user\":{\"id\":\"123456-123456\",\"email\":\"one@two.tree\",\"password\":\"secret\"}}";
    protected static final String jsonNewToken = "{\"type\":\"session.new-token\",\"token\":\"This is a client token\"}";
    protected static final String jsonDefaultClient = "{\"type\":\"default.client\",\"default\":\"Some default\",\"client\":\"some client\"}";
    protected static final String jsonDefaultServer = "{\"type\":\"default.server\",\"default\":\"Some default\",\"server\":\"some server\"}";

    @Test
    public void testJsonToSignin() throws IOException {
        AbstractEventClient event = mapper.readValue(jsonSignin, AbstractEventClient.class);

        System.out.println("EventSignin class: " + event.toString());
        assert event instanceof EventSignin;
        assert event.getType().equals("user.signin");
        assert ((EventSignin)event).getSignin().getEmail().equals("one@two.tree");
    }

    @Test
    public void testSigninToJson() throws IOException {
        AbstractEventClient event = new EventSignin((new Signin()).setEmail("one@two.three").setPassword("Secret"));
        event.setType("user.signin");
        String json = mapper.writeValueAsString(event);

        System.out.println("EventSignin json conversion string: " + json);
        assert json.contains("\"user.signin\"");
    }

    @Test
    public void testJsonToCredentials() throws IOException {
        AbstractEventServer event = mapper.readValue(jsonCredentials, AbstractEventServer.class);

        System.out.println("EventCredentials class: " + event.toString());
        assert event instanceof EventCredentials;
        assert event.getType().equals("user.credentials");
    }

    @Test
    public void testCredentialsToJson() throws IOException {
        UserInfo user = new UserInfo();
        user.setId(UUID.randomUUID().toString());
        user.setEmail("one@two.three");
        user.setProperties("lname", "Петров");
        AbstractEventServer event = new EventCredentials(user);
        String json = mapper.writeValueAsString(event);

        System.out.println("EventCredentials json conversion string: " + json);
        assert json.contains("\"user.credentials\"");
    }

    @Test
    public void testJsonToNewToken() throws IOException {
        AbstractEventServer event = mapper.readValue(jsonNewToken, AbstractEventServer.class);

        System.out.println("EventNewToken class: " + event.toString());
        assert event instanceof EventNewToken;
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

}

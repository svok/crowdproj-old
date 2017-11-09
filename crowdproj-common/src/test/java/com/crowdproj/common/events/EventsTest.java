package com.crowdproj.common.events;

import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.UUID;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.user.EventSignin;
import com.crowdproj.common.events.user.EventCredentials;
import com.crowdproj.common.events.user.EventNewToken;
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
    protected static final String jsonNewToken = "{\"type\":\"user.new-token\",\"token\":\"This is a client token\"}";
    protected static final String jsonDefaultClient = "{\"type\":\"default.client\",\"default\":\"Some defaul\",\"client\":\"some client\"}";
    protected static final String jsonDefaultServer = "{\"type\":\"default.server\",\"default\":\"Some defaul\",\"server\":\"some server\"}";

    @Test
    public void testJsonToSignin() throws IOException {
        AbstractEventClient event = mapper.readValue(jsonSignin, AbstractEventClient.class);

        assert event instanceof EventSignin;
        System.out.println("Signin from json: " + ((EventSignin)event).getSignin().toString());
        System.out.println("Signin from json: " + ((EventSignin)event).getSignin().getEmail());
        assert ((EventSignin)event).getSignin().getEmail().equals("one@two.tree");
    }

    @Test
    public void testSigninToJson() throws IOException {
        AbstractEventClient event = new EventSignin((new Signin()).setEmail("one@two.three").setPassword("Secret"));
        String json = mapper.writeValueAsString(event);

        System.out.println("EventSignin json conversion string: " + json);
        assert json.contains("\"user.signin\"");
    }

    @Test
    public void testJsonToCredentials() throws IOException {
        AbstractEventServer event = mapper.readValue(jsonCredentials, AbstractEventServer.class);

        assert event instanceof EventCredentials;
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

        assert event instanceof EventNewToken;
    }

    @Test
    public void testNewTokenToJson() throws IOException {
        AbstractEventServer event = new EventNewToken("This is very big token 0987098ullkhlkjhlkjhlkjhl");
        String json = mapper.writeValueAsString(event);

        System.out.println("EventNewToken json conversion string: " + json);
        assert json.contains("\"user.new-token\"");
    }

    @Test
    public void testJsonToDefaultClient() throws IOException {
        AbstractEventClient event = mapper.readValue(jsonDefaultClient, AbstractEventClient.class);

        assert event instanceof EventClientDefault;
    }

    @Test
    public void testDefaultClientToJson() throws IOException {
//        AbstractEventClient event = new EventClientDefault("default.client");
        AbstractEventClient event = new EventClientDefault();
        event.setType("default.client");
        String json = mapper.writeValueAsString(event);

        System.out.println("EventClientDefault json conversion string: " + json);
        assert json.contains("\"default.client\"");
    }

}

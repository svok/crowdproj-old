package com.crowdproj.common.events;

import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.UUID;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.user.EventSignin;
import com.crowdproj.common.events.user.EventCredentials;
import com.crowdproj.common.events.user.EventOpenSession;

import com.crowdproj.common.user.Signin;
import com.crowdproj.common.user.UserInfo;

import org.junit.Test;
import org.junit.runner.RunWith;

public class EventsTest {

    private final ObjectMapper mapper = new ObjectMapper();


    protected static final String jsonSignin = "{\"type\":\"user.signin\",\"signin\":{\"email\":\"one@two.tree\",\"password\":\"secret\"}}";
    protected static final String jsonCredentials = "{\"type\":\"user.credentials\",\"user\":{\"id\":\"123456-123456\",\"email\":\"one@two.tree\",\"password\":\"secret\"}}";
    protected static final String jsonOpenSession = "{\"type\":\"user.open-session\",\"token\":\"This is a client token\"}";

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
    public void testJsonToOpenSession() throws IOException {
        AbstractEventClient event = mapper.readValue(jsonOpenSession, AbstractEventClient.class);

        assert event instanceof EventOpenSession;
    }

    @Test
    public void testOpenSessionToJson() throws IOException {
        AbstractEventClient event = new EventOpenSession("This is very big token 0987098ullkhlkjhlkjhlkjhl");
        String json = mapper.writeValueAsString(event);

        System.out.println("EventOpenSession json conversion string: " + json);
        assert json.contains("\"user.open-session\"");
    }

}

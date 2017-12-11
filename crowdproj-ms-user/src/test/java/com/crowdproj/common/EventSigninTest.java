package com.crowdproj.common.events;

import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.UUID;

import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.user.EventSignin;

import org.junit.Test;
import org.junit.runner.RunWith;

public class EventSigninTest {

    private final ObjectMapper mapper = new ObjectMapper();


    protected static final String jsonSignin = "{\"type\":\"user.signin\",\"signin\":{\"email\":\"one@two.tree\",\"password\":\"secret\"}}";

    @Test
    public void testJsonToSignin() throws IOException {
        AbstractEventInternal event = mapper.readValue(jsonSignin, AbstractEventInternal.class);

        System.out.println("EventSignin class: " + event.toString());
        assert event instanceof EventSignin;
        assert event.getType().equals("user.signin");
        assert event.getRoute().equals("user");
        assert ((EventSignin)event).getSignin().getEmail().equals("one@two.tree");
    }

    @Test
    public void testSigninToJson() throws IOException {
        AbstractEventInternal event = new EventSignin((new Signin()).setEmail("one@two.three").setPassword("Secret"));
        event.setType("user.signin");
        String json = mapper.writeValueAsString(event);

        System.out.println("EventSignin json conversion string: " + json);
        assert json.contains("\"user.signin\"");
    }

}

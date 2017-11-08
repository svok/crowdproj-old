package com.crowdproj.common.events;

import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.user.EventSignin;

import com.crowdproj.common.user.Signin;

import org.junit.Test;
import org.junit.runner.RunWith;

public class EventsTest {

    protected static final String jsonClient1 = "{\"type\":\"user.signin\",\"signin\":{}}";

    @Test
    public void testJsonToClass() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        AbstractEventClient event = mapper.readValue(jsonClient1, AbstractEventClient.class);

        assert event instanceof EventSignin;
    }

    @Test
    public void testClassToJson() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        AbstractEventClient event = new EventSignin(new Signin());
        String json = mapper.writeValueAsString(event);

        System.out.println("Event json conversion string: " + json);
        assert json.contains("\"user.signin\"");
    }

}

/**
 *
 * Copyright © 2017 Sergey Okatov. All rights reserved.
 * Author: Sergey Okatov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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


    protected static final String jsonSignin = "{\"type\":\"user.signin\",\"identity\":\"one@two.tree\",\"password\":\"secret\"}";

    @Test
    public void testJsonToEvent() throws IOException {
        AbstractEventInternal event = mapper.readValue(jsonSignin, AbstractEventInternal.class);

        System.out.println("EventSignin class: " + event.toString());
        assert event instanceof EventSignin;
        assert event.getType().equals("user.signin");
        assert event.getRoute() != null;
        assert event.getRoute().equals("user");
        assert ((EventSignin)event).getIdentity().equals("one@two.tree");
        assert ((EventSignin)event).getPassword().equals("secret");
    }

    @Test
    public void testEventToJson() throws IOException {
        AbstractEventInternal event = new EventSignin().setIdentity("one@two.three").setPassword("Secret");
        event.setType("user.signin");
        String json = mapper.writeValueAsString(event);

        System.out.println("EventSignin json conversion string: " + json);
        assert json.contains("\"user.signin\"");
        assert json.contains("\"one@two.three\"");
        assert json.contains("\"Secret\"");
    }

}

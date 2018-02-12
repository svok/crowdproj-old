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

package com.crowdproj.common.events.system;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonSetter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import java.util.stream.Collectors;

import com.crowdproj.common.models.CpSession;
import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.AbstractEventInternal;
//import com.crowdproj.common.events.EventInternalDefault;

public class EventClientDefault extends AbstractEventClient {

    protected Map<String, Object> properties = new HashMap<>();

    @JsonCreator
    public EventClientDefault(@JsonProperty("type") String type) {
        super();
        setType(type);
    }

    @JsonIgnore
    public String getType() {
        return super.getType();
    }

    @JsonAnySetter
    public void setProperties(String name, Object value){
        properties.put(name, value);
    }

    @JsonAnyGetter
    public Map<String, Object> getProperties(){
        return properties;
    }

    public EventInternalDefault toInternalEvent(String sessionId, CpSession cps) {
        EventInternalDefault e = super.toInternalEvent(sessionId, cps);
        e.setProperties(this.getProperties());

        return e;
    }

    public String toString() {
        return super.toString()
            + properties
            .entrySet()
            .stream()
            .map(set -> "    prop["+set.getKey()+"]=\"" + set.getValue().toString() + "\"\n")
            .collect(Collectors.joining(""))
        ;
    }
}

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

package com.crowdproj.common.events.user;

import java.util.Map;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import com.crowdproj.common.models.CpSession;
import com.crowdproj.common.events.AbstractEventInternal;

public class EventUserInfo extends AbstractEventInternal {

    protected String userId;
    protected Map<String, Object> properties;

    public EventUserInfo() {
        super();
    }

    @JsonCreator
    public EventUserInfo(@JsonProperty("userId") String userId) {
        setUserId(userId);
        setProperties(properties);
    }

    public String getUserId() {
        return userId;
    }

    public EventUserInfo setUserId(String userId) {
        this.userId = userId;
        return this;
    }

    // Other properties
    @JsonIgnore
    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }

    @JsonAnySetter
    public void setProperty(String name, Object value) {
        if(properties == null) {
            properties = new HashMap<>();
        }
        properties.put(name, value);
    }

    @JsonAnyGetter
    public Map<String, Object> getProperties(){
        return properties;
    }

    public Object getProperty(String name) {
        if(properties == null) {
            return null;
        }
        return properties.get(name);
    }

    public String toString() {
        return new StringBuilder(1024)
            .append(super.toString())
            .append("\n")
            .append("    userId=")
            .append(userId)
            .append("\n")
            .append("    properties=")
            .append(properties)
            .toString()
        ;
    }

}

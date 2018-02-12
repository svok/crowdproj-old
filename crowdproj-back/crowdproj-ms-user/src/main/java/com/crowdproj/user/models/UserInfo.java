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

package com.crowdproj.user.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.text.ParseException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@JsonInclude(Include.NON_NULL)
public class UserInfo implements UserInterface {

    protected String id;
    protected String email;

    protected UserStatus status;
    protected UserType type;

    protected Map<String, Object> properties = new HashMap<>();

    // --- id -----

    public String getId() {
        return id;
    }

    public UserInfo setId(String id) {
        this.id = id;
        return this;
    }

    // --- email -----

    public String getEmail() {
        return email;
    }

    public UserInfo setEmail(String email) {
        this.email = email;
        return this;
    }

    // --- type -----

    @JsonIgnore
    public UserType getType() {
        return type;
    }

    @JsonIgnore
    public UserInfo setType(UserType type) {
        this.type = type;
        return this;
    }

    @JsonGetter("type_id")
    public Integer getTypeId() {
        return type==null ? 0: type.getId();
    }

    @JsonSetter("type_id")
    public UserInfo setType(Integer typeId) {
        this.type = UserType.create(typeId);
        return this;
    }

    @JsonIgnore
    public UserInfo setType(String typeTag) {
        this.type = UserType.create(typeTag);
        return this;
    }

    @JsonAnySetter
    public UserInfo setProperty(String name, Object value){
        properties.put(name, value);
        return this;
    }

    @JsonAnyGetter
    public Map<String, Object> getProperties(){
        return properties;
    }

    @JsonIgnore
    public Object getProperty(String prop){
        return properties.get(prop);
    }

    @Override
    public String toString() {
        return "UserInfo ["
            + "id=" + id
            + ", email=" + email
            + ", type=" + (type==null ? "" : type.toString())
            + properties.toString()
            + "]";
    }

}
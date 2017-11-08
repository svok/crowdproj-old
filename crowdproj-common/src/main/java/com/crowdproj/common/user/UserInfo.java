package com.crowdproj.common.user;

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

    public void setId(String id) {
        this.id = id;
    }

    // --- email -----

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // --- type -----

    @JsonIgnore
    public UserType getType() {
        return type;
    }

    @JsonIgnore
    public void setType(UserType type) {
        this.type = type;
    }

    @JsonGetter("type_id")
    public Integer getTypeId() {
        return type==null ? 0: type.getId();
    }

    @JsonSetter("type_id")
    public void setType(Integer typeId) {
        this.type = UserType.create(typeId);
    }

    @JsonIgnore
    public void setType(String typeTag) {
        this.type = UserType.create(typeTag);
    }

    @JsonAnySetter
    public void setProperties(String name, Object value){
        properties.put(name, value);
    }

    @JsonAnyGetter
    public Map<String, Object> getProperties(){
        return properties;
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
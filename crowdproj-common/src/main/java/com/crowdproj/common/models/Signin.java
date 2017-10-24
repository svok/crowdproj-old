package com.crowdproj.common.models;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.text.ParseException;

public class Signin {

    protected String email;
    protected String password;


    // --- email -----

    @JsonGetter("email")
    public String getEmail() {
        return email;
    }

    @JsonSetter("email")
    public Signin setEmail(String email) {
        this.email = email;
        return this;
    }

    // passwords

    @JsonGetter("password")
    public String getPassword() {
        return password;
    }

    @JsonSetter("password")
    public Signin setPassword(String password) {
        this.password = password;
        return this;
    }

    @Override
    public String toString() {
        return "Signin ["
            + "email=" + email
            + ", password=" + password
            + "]";
    }

}
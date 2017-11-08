package com.crowdproj.common.user;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.text.ParseException;

@JsonInclude(Include.NON_NULL)
public class Signup {

    protected String email;
    protected String fname;
    protected String mname;
    protected String lname;
    protected LocalDate bdate;
    protected String password;
    protected String password1;


    // --- email -----

    @JsonGetter("email")
    public String getEmail() {
        return email;
    }

    @JsonSetter("email")
    public Signup setEmail(String email) {
        this.email = email;
        return this;
    }

    // passwords

    @JsonGetter("password")
    public String getPassword() {
        return password;
    }

    @JsonSetter("password")
    public Signup setPassword(String password) {
        this.password = password;
        return this;
    }

    @JsonGetter("password1")
    public String getPassword1() {
        return password;
    }

    @JsonSetter("password1")
    public Signup setPassword1(String password) {
        this.password1 = password;
        return this;
    }

    // --- bdate -----

    @JsonIgnore
    public LocalDate getBDate() {
        return bdate;
    }

    @JsonIgnore
    public Signup setBDate(LocalDate bdate) {
        this.bdate = bdate;
        return this;
    }

    @JsonGetter("bdate")
    public String getBDateString() {
        if(bdate == null) return "";
        return bdate.toString();
    }

    @JsonSetter("bdate")
    public Signup setBDate(String bdate) {
        if(bdate == "") {
            this.bdate = null;
        } else {
            this.bdate = LocalDate.parse(bdate);
        }
        return this;
    }

}
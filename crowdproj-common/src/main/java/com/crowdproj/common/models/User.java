package com.crowdproj.common.models;

//import java.util.Date;
import java.time.LocalDate;
import java.text.SimpleDateFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.text.ParseException;

public class User {

    protected String id;
    protected String email;

    protected UserStatus status;
    protected UserType type;

    protected String fname;
    protected String mname;
    protected String lname;
    protected LocalDate bdate;

    public User(){}


    // --- id -----

    @JsonGetter("id")
    public String getId() {
        return id;
    }

    @JsonSetter("id")
    public User setId(String id) {
        this.id = id;
        return this;
    }

    // --- email -----

    @JsonGetter("email")
    public String getEmail() {
        return email;
    }

    @JsonSetter("email")
    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    // --- names -----

    @JsonGetter("fname")
    public String getFName() {
        return fname;
    }

    @JsonSetter("fname")
    public User setFName(String fname) {
        this.fname = fname;
        return this;
    }

    @JsonGetter("mname")
    public String getMName() {
        return mname;
    }

    @JsonSetter("mname")
    public User setMName(String mname) {
        this.mname = mname;
        return this;
    }

    @JsonGetter("lname")
    public String getLName() {
        return lname;
    }

    @JsonSetter("lname")
    public User setLName(String lname) {
        this.lname = lname;
        return this;
    }

    // --- bdate -----

    @JsonIgnore
    public LocalDate getBDate() {
        return bdate;
    }

    @JsonIgnore
    public User setBDate(LocalDate bdate) {
        this.bdate = bdate;
        return this;
    }

    @JsonGetter("bdate")
    public String getBDateString() {
        if(bdate == null) return "";
        return bdate.toString();
    }

    @JsonSetter("bdate")
    public User setBDate(String bdate) {
        if(bdate == "") {
            this.bdate = null;
        } else {
/*
            try {
                SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                this.bdate = df.parse(bdate);
            } catch (ParseException e) {
                this.bdate = null;
            }
*/
            this.bdate = LocalDate.parse(bdate);
        }
        return this;
    }

    // --- type -----

    @JsonIgnore
    public UserType getType() {
        return type;
    }

    @JsonIgnore
    public User setType(UserType type) {
        this.type = type;
        return this;
    }

    @JsonGetter("type_id")
    public Integer getTypeId() {
        return type==null ? 0: type.getId();
    }

    @JsonGetter("type_id")
    public User setType(Integer typeId) {
        this.type = UserType.create(typeId);
        return this;
    }

    @JsonIgnore
    public User setType(String typeTag) {
        this.type = UserType.create(typeTag);
        return this;
    }

    @Override
    public String toString() {
        return "User ["
            + "id=" + id
            + ", email=" + email
            + ", fname=" + fname
            + ", mname=" + mname
            + ", lname=" + lname
            + ", bdate=" + bdate.toString()
            + ", type=" + (type==null ? "" : type.toString())
            + "]";
    }

}
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

    public UserInfo toUser()
    {
        UserInfo user = new UserInfo()
            .setEmail(email)
            .setProperty("bdate", bdate)
            .setProperty("password", password)
        ;

        //for(Map.Entry<String, Object> prop: getProperties()) {
        //    user.setProperty(prop.getKey(), prop.getValue());
        //}
        return user;
    }

}
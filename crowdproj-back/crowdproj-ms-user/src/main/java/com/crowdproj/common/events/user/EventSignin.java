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

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.models.CpSession;
import com.crowdproj.common.events.AbstractEventInternal;

public class EventSignin extends AbstractEventInternal {

    protected String identity;
    protected String password;

    public EventSignin() {
        super();
    }

    @JsonCreator
    public EventSignin(@JsonProperty("identity") String identity, @JsonProperty("password") String password) {
        setIdentity(identity);
        setPassword(password);
    }

    // --- email -----
    public String getIdentity() {
        return identity;
    }

    public EventSignin setIdentity(String identity) {
        this.identity = identity;
        return this;
    }

    // passwords
    public String getPassword() {
        return password;
    }

    public EventSignin setPassword(String password) {
        this.password = password;
        return this;
    }

    @Override
    public String toString() {
        return super.toString()
            + "    identity=" + identity
            + "\n    password=" + password
            + "\n";
    }

}

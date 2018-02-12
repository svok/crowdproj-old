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

import java.util.TreeMap;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class UserStatus {

    public static final Integer STATUS_UNKNOWN = 0;
    public static final Integer STATUS_ACTIVE = 1;
    public static final Integer STATUS_REGISTRATION = 10;
    public static final Integer STATUS_BANNED = 99;

    public static final TreeMap<Integer, String> ID_LABEL;
    static{
        TreeMap<Integer, String> map = new TreeMap<Integer, String>();
        map.put(STATUS_UNKNOWN, "unknown");
        map.put(STATUS_ACTIVE, "active");
        map.put(STATUS_REGISTRATION, "registration");
        map.put(STATUS_BANNED, "banned");

        ID_LABEL = map; //Collections.unmodifiableMap(map);
    }

    public Integer status = 0;

    @Override
    public String toString() {
        return "UserStatus [" + ID_LABEL.get(status) + "]";
    }

}
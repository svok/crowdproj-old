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

import java.util.Map;
import java.util.TreeMap;
import java.util.Collections;
import java.util.stream.*;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class UserType {

    public static final Integer TYPE_UNKNOWN = 0;
    public static final Integer TYPE_NATURAL = 1;
    public static final Integer TYPE_ENTREPRENEUR = 2;
    public static final Integer TYPE_LEGAL = 3;

    public static final TreeMap<Integer, String> ID_LABEL;
    static{
        TreeMap<Integer, String> map = new TreeMap<Integer, String>();
        map.put(TYPE_UNKNOWN, "unknown");
        map.put(TYPE_NATURAL, "natural");
        map.put(TYPE_ENTREPRENEUR, "entrepreneur");
        map.put(TYPE_LEGAL, "legal");

        ID_LABEL = map; //Collections.unmodifiableMap(map);
    }

    protected Integer typeId;

    @Override
    public String toString() {
        return "UserType [" + getTag() + "]";
    }

    public String getTag() {
        return ID_LABEL.get(typeId);
    }

    public Integer getId() {
        return typeId;
    }

    public static UserType create(Integer id) {
        UserType type = new UserType();
        type.typeId = id;
        return type;
    }

    public static UserType create(String label) {
        UserType type = new UserType();
        for (Map.Entry<Integer, String> e : ID_LABEL.entrySet()) {
            if(e.getValue() == label) {
                type.typeId = e.getKey();
                return type;
            }
        }
        type.typeId = 0;
        return type;
    }

}
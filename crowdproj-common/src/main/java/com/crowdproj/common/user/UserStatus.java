package com.crowdproj.common.user;

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
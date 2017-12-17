package com.crowdproj.user.nodes;

import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.system.EventErrorInternal;
import com.crowdproj.common.events.user.EventSignin;
import com.crowdproj.common.events.user.EventUserInfo;

import org.apache.flink.api.common.functions.MapFunction;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SigninNode implements MapFunction<AbstractEventInternal, AbstractEventInternal> {

    @Override
    public AbstractEventInternal map(AbstractEventInternal eventIn) throws Exception {
        if(!(eventIn instanceof EventSignin)) {
            throw new IllegalArgumentException("SigninNode has got non EventSignin class object");
        }

        EventSignin event = (EventSignin) eventIn;
        if(event.getIdentity().equals("test-user") && event.getPassword().equals("test-pass")) {
            EventUserInfo eu = ((EventUserInfo)event.copy(EventUserInfo.class))
                .setUserId("test-user-id")
            ;
            return eu;
        } else {
            EventErrorInternal ee = ((EventErrorInternal)event.copy(EventErrorInternal.class))
                .setRelated(event.getType())
                .addError("Username or password are wrong", "password")
            ;
            return ee;
        }
    }
}

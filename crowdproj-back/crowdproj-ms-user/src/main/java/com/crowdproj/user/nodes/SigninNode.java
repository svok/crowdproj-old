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

package com.crowdproj.user.nodes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.system.EventErrorInternal;
import com.crowdproj.common.events.user.EventSignin;
import com.crowdproj.common.events.user.EventUserInfo;

import org.apache.flink.api.common.functions.MapFunction;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SigninNode implements MapFunction<AbstractEventInternal, AbstractEventInternal> {

    private static final Logger log = LoggerFactory.getLogger(SigninNode.class);

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

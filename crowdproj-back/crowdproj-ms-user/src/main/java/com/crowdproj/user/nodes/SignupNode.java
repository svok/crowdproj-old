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

import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.util.Collector;

import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.system.EventErrorInternal;
import com.crowdproj.common.events.user.EventSignup;
import com.crowdproj.common.events.user.EventUserInfo;
import com.crowdproj.common.events.user.EventNotificationSending;
import com.crowdproj.common.events.user.EventSender;

public class SignupNode implements FlatMapFunction<AbstractEventInternal, AbstractEventInternal> {

    private static final Logger log = LoggerFactory.getLogger(SignupNode.class);

    @Override
    public void flatMap(AbstractEventInternal eventIn, Collector<AbstractEventInternal> eventsOut) throws Exception {

        if(!(eventIn instanceof EventSignup)) {
            throw new IllegalArgumentException("SignupNode has got non EventSignup class object");
        }

        EventSignup event = (EventSignup) eventIn;

        // 1. Check for this identity has been in the database. Reject if if has been. EventErrorInternal.
        // 2. Generate confirm token
        // 3. Write new identity to the database together with confirm token
        // 4. Send email (or sms). EventSender (to ms-sender); EventNotificationSending (back to user).
        // 5. Furhter actions must be in ms-sender
        // 6. EventNotificationSent

        // 4.
        EventNotificationSending en = ((EventNotificationSending)event.copy(EventNotificationSending.class))
            .setContact(event.getContact())
        ;
        eventsOut.collect(en);
        EventSender es = ((EventSender)event.copy(EventSender.class))
            .setContact(event.getContact())
        ;
        eventsOut.collect(es);
    }
}

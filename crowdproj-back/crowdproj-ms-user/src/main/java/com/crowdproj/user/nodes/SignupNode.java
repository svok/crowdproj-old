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

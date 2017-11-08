package com.crowdproj.common.models;

import java.util.HashMap;
import java.util.Map;

public class EventBuilder {
    private String type;
    private PayloadBuilder payloadBuilder = new PayloadBuilder();

    public EventBuilder type(String type) {
        this.type = type;
        return this;
    }

    public PayloadBuilder withPayload() {
        return payloadBuilder;
    }

    private Event buildEvent(Payload payload) {
        return new Event(type, payload);
    }

    public class PayloadBuilder {

        private CpSession session;
        private Map<String, Object> properties = new HashMap<>();

        public PayloadBuilder session(CpSession session) {
            this.session = session;
            return this;
        }

/*
        public PayloadBuilder userAlias(String alias) {
            this.alias = alias;
            return this;
        }

        public PayloadBuilder userAvatar(String avatar) {
            this.avatar = avatar;
            return this;
        }
*/

        public PayloadBuilder setSession(CpSession session) {
            this.session = session;
//            this.avatar = user.getAvatar();
            return this;
        }

/*
        public PayloadBuilder systemUser() {
            user(User.systemUser());
            return this;
        }
*/

        public PayloadBuilder property(String property, Object value) {
            properties.put(property, value);
            return this;
        }


        public Event build() {
            return buildEvent(new Payload(payloadBuilder.session, properties));
        }
    }
}

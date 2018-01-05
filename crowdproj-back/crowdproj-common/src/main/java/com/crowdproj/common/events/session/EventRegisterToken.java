package com.crowdproj.common.events.session;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.crowdproj.common.events.AbstractEventClient;

/**
 * Класс для события регитрации токена. Вызывается клиентом, в событие вкладывается хранящийся у клиента токен.
 */
public class EventRegisterToken extends AbstractEventClient {

    protected String token;

    public void setToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public String toString() {
        return super.toString()
            + "    token=" + (token == null ? "null" : "\"" + token + "\"") + "\n"
        ;
    }

}

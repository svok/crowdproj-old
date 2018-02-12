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

package com.crowdproj.gateway.repositories;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.reactive.socket.WebSocketSession;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.crowdproj.gateway.ws.WebSocketMessageBroker;

@Service
@Scope(value = "singleton")
public class SessionRepository {

    private static final Logger LOG = LoggerFactory.getLogger(SessionRepository.class);

//    @Autowired
//    private ApplicationContext context;

    private static final Map<String, WebSocketMessageBroker> sessions = new HashMap<>();

    public void register(final WebSocketSession session, final WebSocketMessageBroker broker) {
        LOG.info("Registering session {}", session.getId());
        sessions.put(session.getId(), broker);
    }

    public void unregister(final WebSocketSession session) {
        LOG.info("Unregistering session {}", session.getId());
        sessions.remove(session.getId());
    }

//    public WebSocketMessageBroker get(final String sessionId, final String userId) {
    public WebSocketMessageBroker get(final String wsSessionId) {
        LOG.info("Requesting session {}, result: {}", wsSessionId, sessions.get(wsSessionId));
        return sessions.get(wsSessionId);
    }

//    public WebSocketMessageBroker get(final WebSocketSession session, final String userId) {
    public WebSocketMessageBroker get(final WebSocketSession session) {
        return sessions.get(session.getId());
    }

}

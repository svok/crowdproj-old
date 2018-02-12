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

package com.crowdproj.gateway.ws;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.UnicastProcessor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.context.ApplicationContext;

import org.springframework.web.reactive.socket.WebSocketSession;

import com.crowdproj.common.models.CpSession;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.session.EventSessionOpened;
import com.crowdproj.common.events.session.EventSessionClosed;
import com.crowdproj.common.events.session.EventRequestToken;
import com.crowdproj.common.events.session.EventRegisterToken;
import com.crowdproj.common.events.session.EventNewToken;
import com.crowdproj.common.events.system.EventServerDefault;

import com.crowdproj.gateway.repositories.SessionRepository;
import com.crowdproj.gateway.kafka.Sender;

@Service
public class WebSocketMessageBrokerFactory {

    private static final Logger LOG = LoggerFactory.getLogger(WebSocketMessageBrokerFactory.class);

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private Sender sender;

    public WebSocketMessageBroker build(UnicastProcessor<AbstractEventServer> eventPublisher, WebSocketSession session) {
        WebSocketMessageBroker mb = new WebSocketMessageBroker(eventPublisher, session);
        mb.setSessionRepository(sessionRepository);
        mb.setSender(sender);
        return mb;
    }
}

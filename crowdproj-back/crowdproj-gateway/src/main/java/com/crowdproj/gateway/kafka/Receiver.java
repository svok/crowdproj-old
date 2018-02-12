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

package com.crowdproj.gateway.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.messaging.Message;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.listener.ListenerExecutionFailedException;
import org.springframework.kafka.listener.KafkaListenerErrorHandler;
import org.springframework.kafka.support.Acknowledgment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.system.EventInternalDefault;
import com.crowdproj.common.events.system.EventErrorInternal;
import com.crowdproj.gateway.repositories.SessionRepository;
import com.crowdproj.gateway.ws.WebSocketMessageBroker;

@Service
@Scope(value = "singleton")
public class Receiver {

    private static final Logger LOG = LoggerFactory.getLogger(Receiver.class);

    @Autowired
    private SessionRepository sessionRepository;


    @KafkaListener(topics = "${kafka.topic.json}", errorHandler = "receiverErrorHandler")
    public void receive(AbstractEventInternal event, Acknowledgment ack) {
        LOG.info("received event='{}'", event);

        WebSocketMessageBroker mb = sessionRepository.get(event.getWsSessionId());
        if(mb != null) {
            mb.onMessage(event);
        } else {
            LOG.error("Session {} not found in repository for incoming kafka event: {}", event.getWsSessionId(), event);
        }

        ack.acknowledge();
    }

}

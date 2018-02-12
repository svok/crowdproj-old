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

import java.util.concurrent.CountDownLatch;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.messaging.Message;
import org.springframework.kafka.listener.ListenerExecutionFailedException;
import org.springframework.kafka.listener.KafkaListenerErrorHandler;
import org.springframework.kafka.support.Acknowledgment;
import org.apache.kafka.clients.consumer.Consumer;

//import com.crowdproj.common.events.system.EventInternalDefault;

public class KafkaReceiverErrorHandler implements KafkaListenerErrorHandler {

    private static final Logger LOG = LoggerFactory.getLogger(Receiver.class);

    public Object handleError(Message<?> message, ListenerExecutionFailedException exception) {
        LOG.error("CrowdProj Kafka Exception: {}", exception);
        return null;
    }
    public Object handleError(Message<?> message, ListenerExecutionFailedException exception, Consumer<?,?> consumer) {
        LOG.error("CrowdProj Kafka Exception with Consumer: {}", exception);
        return null;
    }
}

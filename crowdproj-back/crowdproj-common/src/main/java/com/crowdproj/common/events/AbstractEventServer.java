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

package com.crowdproj.common.events;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonTypeIdResolver;

import java.util.concurrent.atomic.AtomicInteger;
import com.crowdproj.common.events.system.EventInternalDefault;

@JsonInclude(Include.NON_NULL)
@JsonTypeInfo(
    use = JsonTypeInfo.Id.CUSTOM,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type",
    visible = true
)
@JsonTypeIdResolver(EventTypeIdResolver.class)
abstract public class AbstractEventServer extends AbstractEvent {

    private static AtomicInteger ID_GENERATOR = new AtomicInteger(0);
    private final Integer id;
    private final Long timestamp;
    protected String relates;

    public AbstractEventServer() {
        this.id = ID_GENERATOR.addAndGet(1);
        this.timestamp = System.currentTimeMillis();
    }

    abstract public void fromInternalEvent(AbstractEventInternal event);

    public int getId() {
        return id;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public AbstractEventServer setRelates(String relates) {
        this.relates = relates;
        return this;
    }

    public String getRelates() {
        return relates;
    }

    public String toString() {
        return super.toString()
            + "    id=" + (id == null ? "null" : "\"" + id + "\"") + "\n"
            + "    timestamp=" + (timestamp == null ? "null" : "\"" + Long.toString(timestamp) + "\"") + "\n"
        ;
    }

}

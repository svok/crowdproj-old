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

import java.lang.StringBuilder;

import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.databind.annotation.JsonTypeIdResolver;

import com.crowdproj.common.models.CpSession;
import com.crowdproj.common.models.Error;

import com.crowdproj.common.exceptions.WrongObjectException;
import java.lang.reflect.InvocationTargetException;

@JsonInclude(Include.NON_NULL)
@JsonTypeInfo(
    use = JsonTypeInfo.Id.CUSTOM,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type",
    visible = true
)
@JsonTypeIdResolver(EventTypeIdResolver.class)
abstract public class AbstractEventInternal extends AbstractEvent {

    protected String id;
    protected Long tsCreated;
    protected String wsSessionId;
    protected CpSession cpSession;
    protected Map<String, Object> statuses = null;
    protected List<Error> errors = null;

    public AbstractEventInternal() {
        super();
        id = UUID.randomUUID().toString();
        tsCreated = System.currentTimeMillis();
    }

    public AbstractEventInternal(String id, Long tsCreated) {
        super();
        this.id = id;
        this.tsCreated = tsCreated;
    }

    @JsonCreator
    public AbstractEventInternal(
        @JsonProperty("type") String type,
        @JsonProperty("id") String id,
        @JsonProperty("tsCreated") Long tsCreated
    ) {
        super();
        setType(type);
        this.id = id;
        this.tsCreated = tsCreated;
    }

    // Type
    @JsonIgnore
    public String getType() {
        return super.getType();
    }

    @JsonIgnore
    public void setType(String type) {
        super.setType(type);
    }

    // Id
    public String getId() {
        return id;
    }

    public AbstractEventInternal setId(String id) {
        this.id = id;
        return this;
    }

    // TsCreated
    public Long getTsCreated() {
        return tsCreated;
    }

    public AbstractEventInternal setTsCreated(Long tsCreated) {
        this.tsCreated = tsCreated;
        return this;
    }

    // wsSessionId
    public String getWsSessionId() {
        return wsSessionId;
    }

    public void setWsSessionId(String wsSessionId) {
        this.wsSessionId = wsSessionId;
    }

    // cpSession
    public CpSession getCpSession() {
        return cpSession;
    }

    public void setCpSession(CpSession cpSession) {
        this.cpSession = cpSession;
    }

    // Statuses
    public Map<String, Object> getStatuses() {
        return statuses;
    }

    public void setStatuses(Map<String, Object> statuses) {
        this.statuses = statuses;
    }

    @JsonIgnore
    public Object getStatus(String key) {
        return statuses == null ? null : statuses.get(key);
    }

    @JsonIgnore
    public void setStatus(String key, Object val) {
        if(statuses == null) {
            statuses = new HashMap<String, Object>();
        }
        statuses.put(key, val);
    }

    public AbstractEventInternal copy(Class<? extends AbstractEventInternal> clazz) {
//        AbstractEventInternal newEvent = AbstractEventInternal.class.getConstructor(clazz, ).newInstance();
        try {
            AbstractEventInternal newEvent = clazz //AbstractEventInternal.class
//                .asSubclass(AbstractEventInternal.class)
                .getConstructor()
                .newInstance();
            newEvent.setId(getId());
            newEvent.setTsCreated(getTsCreated());
            newEvent.setWsSessionId(getWsSessionId());
            newEvent.setCpSession(getCpSession());
            return newEvent;
        } catch(NoSuchMethodException em) {
            throw new WrongObjectException("You cannot use class " + clazz.getSimpleName() + " to make a copy", em);
        } catch(InstantiationException ei) {
            throw new WrongObjectException("You cannot use class " + clazz.getSimpleName() + " to make a copy", ei);
        } catch(IllegalAccessException ea) {
            throw new WrongObjectException("You cannot use class " + clazz.getSimpleName() + " to make a copy", ea);
        } catch(InvocationTargetException et) {
            throw new WrongObjectException("You cannot use class " + clazz.getSimpleName() + " to make a copy", et);
        }
    }

    public String toString() {
        StringBuilder sb = new StringBuilder(1024)
            .append(super.toString())
            .append("    id=")
            .append(id)
            .append("\n")
            .append("    tsCreated=")
            .append(tsCreated)
            .append("\n")
            .append("    wsSessionId=")
            .append(wsSessionId)
            .append("\n")
            .append("    cpSession=")
            .append(cpSession)
            .append("\n")
            .append("    statuses=")
            .append(statuses)
            .append("\n")
//            .append("    errors=")
//            .append(errors)
//            .append("\n")
        ;

        return sb.toString();
    }
}

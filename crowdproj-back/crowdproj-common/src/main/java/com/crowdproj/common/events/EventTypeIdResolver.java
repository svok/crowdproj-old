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
import com.fasterxml.jackson.annotation.JsonTypeInfo.Id;

//import com.fasterxml.jackson.databind.jsontype.TypeIdResolver;
import com.fasterxml.jackson.databind.jsontype.impl.TypeIdResolverBase;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.DatabindContext;
import com.fasterxml.jackson.databind.type.TypeFactory;

import java.lang.IllegalStateException;

import com.crowdproj.common.events.system.EventClientDefault;
import com.crowdproj.common.events.system.EventServerDefault;
import com.crowdproj.common.events.system.EventInternalDefault;
import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;
import com.crowdproj.common.events.AbstractEventInternal;

/**
 * Класс для определения ява-класса по полю type JSON-строки
 */
public class EventTypeIdResolver extends TypeIdResolverBase
{
    private static final String EVENT_PACKAGE = AbstractEvent.class.getPackage().getName();
    private JavaType mBaseType;

    @Override
    public void init(JavaType baseType)
    {
        mBaseType = baseType;
    }

    @Override
    public Id getMechanism()
    {
        return Id.CUSTOM;
    }

    @Override
    public String idFromValue(Object obj)
    {
        String type = ((AbstractEvent)obj).getType();
        if(type != null && type != "") return type;

        return idFromValueAndType(obj, obj.getClass());
    }

    @Override
    public String idFromBaseType()
    {
        return idFromValueAndType(null, mBaseType.getRawClass());
    }

    @Override
    public String idFromValueAndType(Object obj, Class<?> clazz) throws IllegalStateException
    {
        if(obj != null) return ((AbstractEvent)obj).getType();
        return AbstractEvent.calcType(clazz);
    }

    @Override
    public JavaType typeFromId(DatabindContext context, String type)
    {
//        System.out.println("idFromValueAndType: Получен json-type " + type);
        Class<?> baseClass = mBaseType.getRawClass();
        Class<?> clazz = AbstractEvent.calcClass(type, baseClass);
/*
        String parts[] = type.split("\\.");
        if(parts.length < 2) {
        }
        String clazzName = new String(EVENT_PACKAGE);
        for(int i = 0; i < parts.length-1; i++) {
            clazzName += "." + parts[i];
        }
        clazzName = clazzName + ".Event" + CaseConverter.typeToClass(parts[parts.length - 1]);

        try {
            clazz = Class.forName(clazzName);
        } catch (ClassNotFoundException e) {
            Class<?> baseClass = mBaseType.getRawClass();
            if(baseClass.isAssignableFrom(EventClientDefault.class)) {
                clazz = EventClientDefault.class;
            } else if(baseClass.isAssignableFrom(EventServerDefault.class)) {
                clazz = EventServerDefault.class;
            } else if(baseClass.isAssignableFrom(EventInternalDefault.class)) {
                clazz = EventInternalDefault.class;
            } else {
                throw new IllegalStateException("Wrong superclass for Event: '" + clazzName + "'");
            }
        }
*/
        return context.constructSpecializedType(mBaseType, clazz);
    }

    @Override
    public String getDescForKnownTypeIds() {
        return null;
    }
}

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

import java.util.concurrent.atomic.AtomicInteger;

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
        String name = clazz.getName();
        System.out.println("Получен объект класса "+name);

        if(clazz.isAssignableFrom(EventClientDefault.class) || clazz.isAssignableFrom(EventServerDefault.class)) {
            if(obj == null) {
                throw new IllegalStateException("EventClientDefault and EventServerDefault must be instantiated");
            } else {
                return ((AbstractEvent)obj).getType();
            }
        }

        if (! name.startsWith(EVENT_PACKAGE) ) {
            throw new IllegalStateException("Class " + clazz + " is not in the package " + EVENT_PACKAGE);
        }

        String suffix = name.substring(EVENT_PACKAGE.length() + 1);
        System.out.println("Суфикс класса " + suffix);
        String parts[] = suffix.split("\\.");

        if(parts.length < 2) {
            throw new IllegalStateException("Class " + clazz + " is not allowed sinse it must be in a subpackage of " + EVENT_PACKAGE);
        }

        String path = new String(parts[0]);
        for(int i = 1; i < parts.length - 1; i++) {
            path.concat("." + parts[i]);
        }
        String lastPart = new String(parts[parts.length - 1]);

        if(! lastPart.startsWith("Event")) {
            throw new IllegalStateException("Class name of " + clazz + " must be suffixed with 'Event'");
        }

        return path + "." + CaseConverter.classToType(lastPart.substring("Event".length()));
    }

    @Override
    public JavaType typeFromId(DatabindContext context, String type)
    {
        Class<?> clazz;
        String parts[] = type.split("\\.");
        if(parts.length < 2) {
        }
        String clazzName = new String(EVENT_PACKAGE);
        for(int i = 0; i < parts.length-1; i++) {
            clazzName += "." + parts[i];
        }
        clazzName = clazzName + ".Event" + CaseConverter.typeToClass(parts[parts.length - 1]);

        try {
            // clazz = ClassUtil.findClass(clazzName);
            clazz = Class.forName(clazzName);
        } catch (ClassNotFoundException e) {
            Class<?> baseClass = mBaseType.getRawClass();
            if(baseClass.isAssignableFrom(EventClientDefault.class)) {
                clazz = EventClientDefault.class;
            } else if(baseClass.isAssignableFrom(EventServerDefault.class)) {
                clazz = EventServerDefault.class;
            } else {
                throw new IllegalStateException("Wrong superclass for Event: '" + clazzName + "'");
            }
        }
        return TypeFactory.defaultInstance().constructSpecializedType(mBaseType, clazz);
    }

    @Override
    public String getDescForKnownTypeIds() {
        return null;
    }
}

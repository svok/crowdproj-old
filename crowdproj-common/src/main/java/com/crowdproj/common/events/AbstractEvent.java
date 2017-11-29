package com.crowdproj.common.events;

import com.fasterxml.jackson.annotation.JsonTypeId;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

import com.crowdproj.common.events.system.EventClientDefault;
import com.crowdproj.common.events.system.EventServerDefault;
import com.crowdproj.common.events.system.EventInternalDefault;

abstract public class AbstractEvent {

    private static final String EVENT_PACKAGE = AbstractEvent.class.getPackage().getName();

    protected String type_id;

//    @JsonTypeId
    public void setType(String type) {
        this.type_id = type;
    }

//    @JsonTypeId
    public String getType() {
        return type_id == null ? calcType(this, getClass()) : type_id;
    }

    public String getRoute() {
        if(type_id == null) return null;

        int pos = type_id.lastIndexOf(".");
        return pos == -1 ? null : type_id.substring(0, pos);
    }

    public String calcType() {
        return calcType(getClass());
    }

    public static String calcType(Class<?> clazz) {
        return calcType(null, clazz);
    }

    public static String calcType(Object obj, Class<?> clazz) {
        // Class<?> clazz = MethodHandles.lookup().lookupClass();
        String name = clazz.getName();

/*
        if(clazz.isAssignableFrom(EventClientDefault.class) || clazz.isAssignableFrom(EventServerDefault.class)) {
            if(obj == null) {
                throw new IllegalStateException("EventClientDefault and EventServerDefault must be instantiated");
            } else {
                return ((AbstractEvent)obj).type_id;
            }
        }
*/

        if (! name.startsWith(EVENT_PACKAGE) ) {
            throw new IllegalStateException("Class " + clazz + " is not in the package " + EVENT_PACKAGE);
        }

        String suffix = name.substring(EVENT_PACKAGE.length() + 1);
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

    public static Class<?> calcClass(String type, Class<?> baseClass) {
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
            clazz = Class.forName(clazzName);
        } catch (ClassNotFoundException e) {
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
        return clazz;
    }

    public String toString() {
        return getClass().getName() + ": \n"
            + "    type=" + (type_id == null ? "null" : "\""+type_id+"\"") + "\n"
        ;
    }

}

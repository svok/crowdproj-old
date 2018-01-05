package com.crowdproj.common.events;

import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.lang.StringBuffer;

public class CaseConverter {

    public static String classToType(String clazz) {
        return clazz
            .replaceAll("(.)(\\p{Upper})", "$1-$2")
            .toLowerCase()
        ;
    }

    public static String typeToClass(String type) {
        Pattern p = Pattern.compile("(?:^|-)(.)");
        Matcher m = p.matcher(type);
        StringBuffer sb = new StringBuffer();
        while (m.find()) {
            m.appendReplacement(sb, m.group(1).toUpperCase());
        }
        m.appendTail(sb);
        return sb.toString();
    }

}

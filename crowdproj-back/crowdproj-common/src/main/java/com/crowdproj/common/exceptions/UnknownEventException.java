package com.crowdproj.common.exceptions;

import java.lang.RuntimeException;

public class UnknownEventException extends RuntimeException {

    public UnknownEventException(final String message) {
        super(message);
    }
}

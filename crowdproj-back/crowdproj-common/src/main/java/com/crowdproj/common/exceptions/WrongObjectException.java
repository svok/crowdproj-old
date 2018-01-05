package com.crowdproj.common.exceptions;

public class WrongObjectException extends RuntimeException {

    public WrongObjectException(final String message) {
        super(message);
    }

    public WrongObjectException(final String message, Throwable e) {
        super(message, e);
    }
}

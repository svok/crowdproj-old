package com.crowdproj.common.exceptions;

public class PathNotFoundException extends RuntimeException {

    public PathNotFoundException(final String message) {
        super(message);
    }
}

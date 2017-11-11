package com.crowdproj.gateway.handlers;

import org.springframework.http.HttpStatus;
import reactor.core.publisher.Mono;

//import com.crowdproj.common.exceptions.GetGeoLocationException;
import com.crowdproj.common.exceptions.InvalidParametersException;
//import com.crowdproj.common.exceptions.GeoLocationNotFoundException;
import com.crowdproj.common.exceptions.PathNotFoundException;

class ThrowableTranslator {

    private final HttpStatus httpStatus;
    private final String message;

    private ThrowableTranslator(final Throwable throwable) {
        this.httpStatus = getStatus(throwable);
        this.message = throwable.getMessage();
    }

    private HttpStatus getStatus(final Throwable error) {
        if (error instanceof InvalidParametersException) {
            return HttpStatus.BAD_REQUEST;
        } else if (error instanceof PathNotFoundException) {
            return HttpStatus.NOT_FOUND;
//        } else if (error instanceof GeoLocationNotFoundException) {
//            return HttpStatus.NOT_FOUND;
//        } else if (error instanceof GetGeoLocationException) {
//            if (error.getCause() instanceof InvalidParametersException)
//                return HttpStatus.BAD_REQUEST;
//            else
//                return HttpStatus.INTERNAL_SERVER_ERROR;
        } else {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    HttpStatus getHttpStatus() {
        return httpStatus;
    }

    String getMessage() {
        return message;
    }

    static <T extends Throwable> Mono<ThrowableTranslator> translate(final Mono<T> throwable) {
        return throwable.flatMap(error -> Mono.just(new ThrowableTranslator(error)));
    }
}

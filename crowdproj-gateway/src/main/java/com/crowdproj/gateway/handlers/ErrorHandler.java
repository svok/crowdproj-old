package com.crowdproj.gateway.handlers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import com.crowdproj.common.exceptions.PathNotFoundException;
import com.crowdproj.common.models.ErrorResponse;

public class ErrorHandler {

    private static final String NOT_FOUND = "not found";
    private static final String ERROR_RAISED = "error raised";
    private static final Logger logger = LoggerFactory.getLogger(ErrorHandler.class);

    public Mono<ServerResponse> notFound(final ServerRequest request) {
        return Mono.just(new PathNotFoundException(NOT_FOUND)).transform(this::getResponse);
    }

    Mono<ServerResponse> throwableError(final Throwable error) {
        logger.error(ERROR_RAISED, error);
        return Mono.just(error).transform(this::getResponse);
    }

    <T extends Throwable> Mono<ServerResponse> getResponse(final Mono<T> monoError) {
        return monoError.transform(ThrowableTranslator::translate)
                .flatMap(translation -> ServerResponse
                        .status(translation.getHttpStatus())
                        .body(Mono.just(new ErrorResponse(translation.getMessage())), ErrorResponse.class));
    }
}

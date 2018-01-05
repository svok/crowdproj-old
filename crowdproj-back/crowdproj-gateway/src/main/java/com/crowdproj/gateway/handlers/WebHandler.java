package com.crowdproj.gateway.handlers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import reactor.core.publisher.Mono;

@Service
public class WebHandler {

    public static final String resp = "Hello World!";

    public Mono<ServerResponse> handleRoot(ServerRequest request) {
        System.out.println("########### handleRoot");
        return ServerResponse.ok().render(resp);
    }

}

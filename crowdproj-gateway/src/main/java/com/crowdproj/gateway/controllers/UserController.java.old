package com.crowdproj.gateway.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import com.crowdproj.common.models.User;

@RestController("/api/v2")
public class UserController {

    @GetMapping("/user")
    public Mono<ServerResponse> handleGetUsers() {
        System.out.println("########### /user");
        return WebClient.create("http://localhost:9000").get().uri("/api/user")
                .accept(MediaType.APPLICATION_JSON).exchange().flatMap(resp -> ServerResponse.ok().body(resp.bodyToFlux(User.class), User.class));
    }

    @GetMapping("/user/{id}")
    public Mono<ServerResponse> handleGetUserById(@PathVariable String id) {
        return WebClient.create("http://localhost:9000").get().uri("/api/user/" + id)
                .accept(MediaType.APPLICATION_JSON).exchange().flatMap(resp -> ServerResponse.ok().body(resp.bodyToMono(User.class), User.class));
    }

}

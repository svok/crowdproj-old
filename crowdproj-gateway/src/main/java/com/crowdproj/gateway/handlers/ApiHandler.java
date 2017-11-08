package com.crowdproj.gateway.handlers;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.http.HttpStatus;

import reactor.core.publisher.Mono;

import com.crowdproj.common.models.User;
import com.crowdproj.common.models.Signin;
import com.crowdproj.common.models.Signup;
import com.crowdproj.common.models.CpSession;

import com.crowdproj.gateway.repositories.UserRepository;

@Service
public class ApiHandler {

    private static final Logger logger = LoggerFactory.getLogger(ApiHandler.class);

    @Value("${server.secret}")
    private String secret;

    @Autowired
    private UserRepository userRepository;

    public Mono<ServerResponse> signin(ServerRequest request) {
        System.out.println("########### signin");
        Mono<Signin> signin = request.bodyToMono(Signin.class);
        return userRepository.signin(signin)
            .flatMap(user -> ServerResponse.ok().body(Mono.just(user), User.class))
            .switchIfEmpty(ServerResponse.status(HttpStatus.FORBIDDEN).build())
        ;
    }

    public Mono<ServerResponse> signup(ServerRequest request) {
        System.out.println("########### signup");
        Mono<Signup> signup = request.bodyToMono(Signup.class);
        return ServerResponse.ok().build(userRepository.signup(signup));
    }

    public Mono<ServerResponse> signupTest(ServerRequest request) {
        System.out.println("########### signupTest");
        Mono<Signup> signup = request.bodyToMono(Signup.class);
        return ServerResponse.ok().body(userRepository.signupTest(signup), User.class);
    }

    public Mono<ServerResponse> getUsers(ServerRequest request) {
        System.out.println("########### handleGetUsers");
        return ServerResponse.ok().body(userRepository.getUsers(), User.class);
    }

    public Mono<ServerResponse> getUserById(ServerRequest request) {
        return userRepository.getUserById(request.pathVariable("id"))
            .flatMap(user -> ServerResponse.ok().body(Mono.just(user), User.class))
            .switchIfEmpty(ServerResponse.notFound().build())
        ;
    }

    public Mono<ServerResponse> getNewSession(ServerRequest request) {

        CpSession session = CpSession.createNew();

        try {
            String tag = session.getToken();
            return ServerResponse.ok().body(BodyInserters.fromObject(tag));
        } catch(IOException e) {
            System.out.println("Ошибка 500 в getNewSession");
            return ServerResponse.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}

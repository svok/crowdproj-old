/**
 *
 * Copyright © 2017 Sergey Okatov. All rights reserved.
 * Author: Sergey Okatov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

//import com.crowdproj.common.user.User;
//import com.crowdproj.common.user.Signin;
//import com.crowdproj.common.user.Signup;

//import com.crowdproj.gateway.repositories.UserRepository;

@Service
public class ApiHandler {

    private static final Logger logger = LoggerFactory.getLogger(ApiHandler.class);

    // @Autowired
    // private UserRepository userRepository;

/*
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
*/
}

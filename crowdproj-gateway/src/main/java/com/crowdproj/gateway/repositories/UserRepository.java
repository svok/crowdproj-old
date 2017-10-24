package com.crowdproj.gateway.repositories;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.text.ParseException;

import com.crowdproj.common.models.User;
import com.crowdproj.common.models.Signin;
import com.crowdproj.common.models.Signup;

@Repository
public class UserRepository {

    private final List<User> users = new ArrayList<User>(Arrays.asList(
        new User()
            .setId("1")
            .setEmail("ivan@ivanovich.ivanov")
            .setFName("Ivan")
            .setMName("Ivanovich")
            .setLName("Ivanov")
            .setBDate("1987-01-12")
        ,
        new User()
            .setId("2")
            .setEmail("peter@petrovich.petrov")
            .setFName("Petr")
            .setMName("Petrovich")
            .setLName("Petrov")
            .setBDate("1987-04-12")
    ));

    public Mono<User> getUserById(String id) {
        return Mono.justOrEmpty(users.stream().filter(user -> {
            return user.getId().equals(id);
        }).findFirst().orElse(null));
    }

    public Flux<User> getUsers() {
        return Flux.fromIterable(users);
    }

    public Mono<User> signin(Mono<Signin> signinMono) {
        return signinMono.flatMap(signin -> {
            return Mono.justOrEmpty(users.stream().filter(user -> {
                return user.getEmail().equals(signin.getEmail());
            }).findFirst().orElse(null));
        });
    }

    public Mono<Void> signup(Mono<Signup> signupMono) {

        return signupMono.doOnNext(signup -> {
            int id = users.size() + 1;
            User user = signup.toUser()
                .setId(Integer.toString(id))
            ;
            users.add(user);
            System.out.format("Saved %s\n", user);
        }).thenEmpty(Mono.empty());


    }

    public Flux<User> signupTest(Mono<Signup> signupMono) {
        return signupMono.doOnNext(signup -> {
            int id = users.size() + 1;
            User user = signup.toUser()
                .setId(Integer.toString(id))
            ;
            users.add(user);
            System.out.format("Saved %s\n", user);
        }).thenMany(Flux.fromIterable(users));
    }


}

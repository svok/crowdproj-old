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

import com.crowdproj.common.user.UserInfo;
import com.crowdproj.common.user.Signin;
import com.crowdproj.common.user.Signup;

@Repository
public class UserRepository {

    private final List<UserInfo> users = new ArrayList<UserInfo>(Arrays.asList(
        new UserInfo()
            .setId("1")
            .setEmail("ivan@ivanovich.ivanov")
            .setProperty("fname", "Ivan")
            .setProperty("mname", "Ivanovich")
            .setProperty("lname", "Ivanov")
            .setProperty("bdate", "1987-01-12")
        ,
        new UserInfo()
            .setId("2")
            .setEmail("peter@petrovich.petrov")
            .setProperty("fname", "Petr")
            .setProperty("mname", "Petrovich")
            .setProperty("lname", "Petrov")
            .setProperty("bdate", "1987-04-12")
    ));

    public Mono<UserInfo> getUserById(String id) {
        return Mono.justOrEmpty(users.stream().filter(user -> {
            return user.getId().equals(id);
        }).findFirst().orElse(null));
    }

    public Flux<UserInfo> getUsers() {
        return Flux.fromIterable(users);
    }

    public Mono<UserInfo> signin(Mono<Signin> signinMono) {
        return signinMono.flatMap(signin -> {
            return Mono.justOrEmpty(users.stream().filter(user -> {
                return user.getEmail().equals(signin.getEmail());
            }).findFirst().orElse(null));
        });
    }

    public Mono<Void> signup(Mono<Signup> signupMono) {

        return signupMono.doOnNext(signup -> {
            int id = users.size() + 1;
            UserInfo user = signup.toUser()
                .setId(Integer.toString(id))
            ;
            users.add(user);
            System.out.format("Saved %s\n", user);
        }).thenEmpty(Mono.empty());


    }

    public Flux<UserInfo> signupTest(Mono<Signup> signupMono) {
        return signupMono.doOnNext(signup -> {
            int id = users.size() + 1;
            UserInfo user = signup.toUser()
                .setId(Integer.toString(id))
            ;
            users.add(user);
            System.out.format("Saved %s\n", user);
        }).thenMany(Flux.fromIterable(users));
    }


}

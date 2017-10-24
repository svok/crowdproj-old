package com.crowdproj.gateway.client;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.WebClient;

import com.crowdproj.common.models.User;

public class UserClient {

    public static void main(String[] args) {

        //
        ClientResponse response = WebClient.create("http://localhost:9000").get().uri("/api/user")
                .accept(MediaType.APPLICATION_JSON).exchange().block();
        assert response.statusCode().value() == 200;
        List<User> users = response.bodyToFlux(User.class).collectList().block();
        assert users.size() == 2;
        assert users.iterator().next().getLName().equals("Ivanov");

        //
        User user = WebClient.create("http://localhost:9000").get().uri("/api/user/1")
                .accept(MediaType.APPLICATION_JSON).exchange().flatMap(resp -> resp.bodyToMono(User.class)).block();
        assert user.getId() == "1";
        assert user.getLName().equals("Ivanov");

        response = WebClient.create("http://localhost:9000").get().uri("/api/user/10")
                .accept(MediaType.APPLICATION_JSON).exchange().block();
        assert response.statusCode().value() == 404;

    }

}

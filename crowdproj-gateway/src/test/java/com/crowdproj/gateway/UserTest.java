package com.crowdproj.gateway;

import java.io.IOException;
import java.util.List;

import org.junit.Test;
import org.junit.FixMethodOrder;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.FluxExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;

import reactor.core.publisher.Mono;

import com.crowdproj.common.models.User;
import com.crowdproj.common.models.Signin;
import com.crowdproj.common.models.Signup;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    public void test00Users() throws IOException {
        FluxExchangeResult<User> result = webTestClient
            .get()
            .uri("/api/user")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .returnResult(User.class)
        ;
        assert result.getStatus().value() == 200;
        List<User> users = result.getResponseBody().collectList().block();
        System.out.println("getUsers " + users.toString());
        assert users.size() == 2;
        assert users.iterator().next().getLName().equals("Ivanov");
    }

    @Test
    public void test01User1() throws IOException {
        User user = webTestClient
            .get()
            .uri("/api/user/1")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .returnResult(User.class)
            .getResponseBody()
            .blockFirst()
        ;
        assert user.getId().equals("1");
        assert user.getLName().equals("Ivanov");
        assert user.getBDateString().equals("1987-01-12");
    }

    @Test
    public void test02Signin() throws IOException {

        Signin signin = new Signin()
            .setEmail("ivan@ivanovich.ivanov")
            .setPassword("123456")
        ;

        User user = webTestClient
            .post()
            .uri("/api/signin")
            .accept(MediaType.APPLICATION_JSON)
            .body(BodyInserters.fromObject(signin))
            .exchange()
            .returnResult(User.class)
            .getResponseBody()
            .blockFirst()
        ;
        assert user.getId().equals("1");
        assert user.getLName().equals("Ivanov");
        assert user.getBDateString().equals("1987-01-12");
    }

/*
    @Test
    public void test03SignupTest() throws IOException {

        Signup signup = new Signup()
            .setEmail("pikal@pikalovichich.pikalov")
            .setPassword("123456")
            .setFName("Pikal")
            .setMName("Pikalovich")
            .setLName("Pikalov")
            .setBDate("1983-06-18")
        ;

        FluxExchangeResult<User> result_post = webTestClient
            .post()
            .uri("/api/signupTest")
            .accept(MediaType.APPLICATION_JSON)
            .body(BodyInserters.fromObject(signup))
            .exchange()
            .returnResult(User.class)
        ;
        System.out.println("Code: ");
        System.out.println(result_post.getStatus().value());
        assert result_post.getStatus().value() == 200;
        List<User> users = result_post.getResponseBody().collectList().block();
        assert users.size() == 3;
    }
*/

    @Test
    public void test04Signup() throws IOException {

        Signup signup = new Signup()
            .setEmail("pikal@pikalovichich.pikalov")
            .setPassword("123456")
            .setFName("Pikal")
            .setMName("Pikalovich")
            .setLName("Pikalov")
            .setBDate("1983-06-18")
        ;

        FluxExchangeResult<Void> result_post = webTestClient
            .post()
            .uri("/api/signup")
            .accept(MediaType.APPLICATION_JSON)
            .body(BodyInserters.fromObject(signup))
            .exchange()
            .returnResult(Void.class)
        ;
        assert result_post.getStatus().value() == 200;

        FluxExchangeResult<User> result_get =  webTestClient
            .get()
            .uri("/api/user/3")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .returnResult(User.class)
        ;
        assert result_get.getStatus().value() == 200;
    }

    @Test
    public void test05Session() throws IOException {

        FluxExchangeResult<String> result = webTestClient
            .get()
            .uri("/api/new-session")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .returnResult(String.class)
        ;
        assert result.getStatus().value() == 200;

        String tag = result.getResponseBody().blockFirst();
        assert tag.length() > 10;
    }

    @Test
    public void test99User404() throws IOException {
        webTestClient.get().uri("/api/user/10").accept(MediaType.APPLICATION_JSON).exchange().expectStatus()
                .isNotFound();
    }

}

package com.crowdproj.gateway;

import java.io.IOException;
import java.util.List;
import java.util.Arrays;
import java.time.Duration;
import java.net.URI;
import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.MediaType;

import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.FluxExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;

import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.socket.client.ReactorNettyWebSocketClient;
import org.springframework.web.reactive.socket.client.WebSocketClient;
import org.springframework.web.reactive.socket.WebSocketMessage;

import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.ReplayProcessor;
import reactor.core.publisher.UnicastProcessor;

import com.crowdproj.common.models.User;
import com.crowdproj.common.models.Signin;
import com.crowdproj.common.models.Signup;

import com.crowdproj.common.events.session.EventSessionOpened;
import com.crowdproj.common.events.session.EventSessionClosed;
import com.crowdproj.common.events.session.EventRequestToken;
import com.crowdproj.common.events.session.EventRegisterToken;
import com.crowdproj.common.events.session.EventNewToken;

import org.springframework.test.context.TestPropertySource;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
@TestPropertySource(locations="classpath:testApplication.properties")
//@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class WsSystemTest {

    @LocalServerPort
    private String port;

    @Autowired
    private WebTestClient webTestClient;
    private final WebSocketClient client = new ReactorNettyWebSocketClient();
    private final ObjectMapper mapper = new ObjectMapper();

    private final Duration dur = Duration.ofMillis(2000);
    private UnicastProcessor<String> output;



    @Before
    public void setUp() {
        output = UnicastProcessor.create();
    }

    @Test
    public void testError() throws IOException, URISyntaxException {
        EventSessionOpened event = new EventSessionOpened();
        String message;
        try {
            message = mapper.writeValueAsString(event);
            System.out.println("Test: sending message to server: " + message);
        } catch(Exception e) {
            System.err.println(e);
            message = "";
        }

        Flux<String> input = Flux.just(message);

        client.execute(new URI("ws://127.0.0.1:" + port + "/ws"), session -> {
            System.out.println("Test: Starting to send messages");
            return session
                .send(input.doOnNext(s -> System.out.println("Test: outbound " + s)).map(session::textMessage))
                .thenMany(session.receive().take(dur).map(WebSocketMessage::getPayloadAsText))
                .subscribeWith(output)
                .doOnNext(s -> {
                    System.out.println("Test: inbound " + s);
                    session.close();
                })
                .then()
                .doOnSuccessOrError((aVoid, ex) ->
                    System.out.println("Test: Done with " + (ex != null ? ex.getMessage() : "success")));
        })
        .block(Duration.ofMillis(5000));
    }

    @Test
    public void testRequestToken() throws IOException, URISyntaxException {
        EventRequestToken event = new EventRequestToken();
        String message = mapper.writeValueAsString(event);
        System.out.println("Test: sending message to server: " + message);

        Flux<String> input = Flux.just(message);

        client.execute(new URI("ws://127.0.0.1:" + port + "/ws"), session -> {
            System.out.println("Test: Starting to send messages");
            return session
                .send(input.doOnNext(s -> System.out.println("Test: outbound " + s)).map(session::textMessage))
                .thenMany(session.receive().take(dur).map(WebSocketMessage::getPayloadAsText))
                .subscribeWith(output)
                .doOnNext(s -> {
                    System.out.println("Test: inbound " + s);
                    session.close();
                })
                .then()
                .doOnSuccessOrError((aVoid, ex) ->
                    System.out.println("Test: Done with " + (ex != null ? ex.getMessage() : "success")));
        })
        .block(Duration.ofMillis(5000));
    }

}

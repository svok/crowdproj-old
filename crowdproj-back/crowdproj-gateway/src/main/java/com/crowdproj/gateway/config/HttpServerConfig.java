package com.crowdproj.gateway.config;

import java.util.Map;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.core.env.Environment;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.server.reactive.HttpHandler;
import org.springframework.http.server.reactive.ReactorHttpHandlerAdapter;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.socket.WebSocketSession;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import reactor.core.publisher.Flux;
import reactor.core.publisher.UnicastProcessor;

import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import reactor.ipc.netty.http.server.HttpServer;

import com.crowdproj.gateway.handlers.ApiHandler;
import com.crowdproj.gateway.handlers.ErrorHandler;
import com.crowdproj.gateway.routers.MainRouter;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;


import org.springframework.core.io.ClassPathResource;
import org.springframework.web.reactive.function.server.RouterFunction;
import static org.springframework.web.reactive.function.server.RouterFunctions.resources;



@Configuration
@EnableWebFlux
@ComponentScan("com.crowdproj.gateway")
public class HttpServerConfig {

    private static final Logger LOG = LoggerFactory.getLogger(HttpServerConfig.class);

    @Autowired
    private Environment environment;

    @Autowired
    private BeanFactory beanFactory;

//    @Autowired
//    private CpSessionConfig.CpSessionFactory cpSessionFactory;

    @Value("${server.port:8080}")
    private int port = 8080;

    @Value("${server.host:localhost}")
    private String host = "localhost";

    @Bean
    public HttpServer httpServer(RouterFunction<?> mainRouterFunction) {
        HttpHandler httpHandler = RouterFunctions.toHttpHandler(mainRouterFunction);
        ReactorHttpHandlerAdapter adapter = new ReactorHttpHandlerAdapter(httpHandler);
        System.out.println("########### httpServer Bean");
        HttpServer server = HttpServer.create(host, port);
        server.newHandler(adapter);
        return server;
    }

    @Bean
    ErrorHandler errorHandler() {
        return new ErrorHandler();
    }

    @Bean
    RouterFunction<?> mainRouterFunction() {
        return resources("/", new ClassPathResource("public/index.html"))
            .andOther(resources("/**", new ClassPathResource("public/")));
    }

/*
    @Bean
    RouterFunction<?> mainRouterFunction(final ApiHandler apiHandler, final ErrorHandler errorHandler) {
        return MainRouter.doRoute(apiHandler, errorHandler);
    }
*/

}

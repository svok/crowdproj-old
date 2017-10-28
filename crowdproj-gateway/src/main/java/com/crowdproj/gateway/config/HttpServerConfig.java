package com.crowdproj.gateway.config;

import java.util.Map;
import java.util.HashMap;

import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.reactive.HttpHandler;
import org.springframework.http.server.reactive.ReactorHttpHandlerAdapter;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import reactor.core.publisher.Flux;
import reactor.core.publisher.UnicastProcessor;

import reactor.ipc.netty.http.server.HttpServer;

import com.crowdproj.gateway.handlers.ApiHandler;
import com.crowdproj.gateway.handlers.WsHandler;
import com.crowdproj.gateway.handlers.ErrorHandler;
import com.crowdproj.gateway.routers.MainRouter;

import com.crowdproj.common.models.Event;

@Configuration
@EnableWebFlux
public class HttpServerConfig {

    @Autowired
    private Environment environment;

    @Value("${server.port:8080}")
    private int port = 8080;

    @Value("${server.host:localhost}")
    private String host = "localhost";

/*
    @Bean
    public HttpServer httpServer(RouterFunction<?> routerFunction) {
        HttpHandler httpHandler = RouterFunctions.toHttpHandler(routerFunction);
        ReactorHttpHandlerAdapter adapter = new ReactorHttpHandlerAdapter(httpHandler);
        System.out.println("########### httpServer Bean");
        HttpServer server = HttpServer.create(host, port);
        server.newHandler(adapter);
        return server;
    }
*/

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
    RouterFunction<?> mainRouterFunction(final ApiHandler apiHandler, final ErrorHandler errorHandler) {
        return MainRouter.doRoute(apiHandler, errorHandler);
    }

/*
    @Bean
    public HandlerMapping webSocketMapping(UnicastProcessor<Event> eventPublisher, Flux<Event> events) {
        Map<String, Object> map = new HashMap<>();
        map.put("/ws", new WsHandler(eventPublisher, events));
        SimpleUrlHandlerMapping simpleUrlHandlerMapping = new SimpleUrlHandlerMapping();
        simpleUrlHandlerMapping.setUrlMap(map);

        //Without the order things break :-/
        simpleUrlHandlerMapping.setOrder(10);
        return simpleUrlHandlerMapping;
    }

    @Bean
    public WebSocketHandlerAdapter handlerAdapter() {
        return new WebSocketHandlerAdapter();
    }
*/
}

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

import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.WebSocketService;
import org.springframework.web.reactive.socket.server.support.HandshakeWebSocketService;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import org.springframework.web.reactive.socket.server.upgrade.ReactorNettyRequestUpgradeStrategy;
import org.springframework.web.socket.sockjs.SockJsService;
import org.springframework.web.socket.sockjs.support.SockJsHttpRequestHandler;
import org.springframework.web.socket.sockjs.transport.handler.DefaultSockJsService;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

import reactor.ipc.netty.http.server.HttpServer;

import com.crowdproj.gateway.handlers.ApiHandler;
import com.crowdproj.gateway.handlers.WsHandler;
import com.crowdproj.gateway.handlers.ErrorHandler;
import com.crowdproj.gateway.handlers.WebSocketMessageBrokerFactory;
import com.crowdproj.gateway.handlers.WsHandler;
import com.crowdproj.gateway.routers.MainRouter;
import com.crowdproj.gateway.repositories.SessionRepository;

import com.crowdproj.common.events.AbstractEventClient;
import com.crowdproj.common.events.AbstractEventServer;

@Configuration
@EnableWebFlux
@ComponentScan("com.crowdproj.gateway")
public class HttpServerConfig {

    private static final Logger LOG = LoggerFactory.getLogger(ApiHandler.class);

    @Autowired
    private Environment environment;

    @Autowired
    private BeanFactory beanFactory;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private WebSocketMessageBrokerFactory webSocketMessageBrokerFactory;

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
    RouterFunction<?> mainRouterFunction(final ApiHandler apiHandler, final ErrorHandler errorHandler) {
        return MainRouter.doRoute(apiHandler, errorHandler);
    }

    @Bean
    public HandlerMapping webSocketMapping() {

        Map<String, WebSocketHandler> map = new HashMap<>();
        WebSocketHandler wsHandler = beanFactory.getBean(WsHandler.class);

        // Connect to WebSocket
        map.put("/ws", wsHandler);

        SimpleUrlHandlerMapping simpleUrlHandlerMapping = new SimpleUrlHandlerMapping();
        simpleUrlHandlerMapping.setUrlMap(map);

        //Without the order things break :-/
        simpleUrlHandlerMapping.setOrder(10);
        return simpleUrlHandlerMapping;
    }

    @Bean
    public WsHandler wsHandler() {
        return new WsHandler();
    }

/*
    @Bean
    public HandlerMapping webSocketMapping(UnicastProcessor<Event> eventPublisher, Flux<Event> events) {

        Map<String, WebSocketHandler> map = new HashMap<>();
        WebSocketHandler wsHandler = new WsHandler(eventPublisher, events);

        // Connect to WebSocket
        map.put("/ws", wsHandler);

        // Connect to SockJS
        //SockJsService sockJsService = new DefaultSockJsService(sockJsTaskScheduler());
        SockJsService sockJsService = new DefaultSockJsService(new ThreadPoolTaskScheduler());

                                                                        // reactive WebSocketHandler не поддерживается в этом месте
        map.put("/sockjs/**", new SockJsHttpRequestHandler(sockJsService, wsHandler));

        SimpleUrlHandlerMapping simpleUrlHandlerMapping = new SimpleUrlHandlerMapping();
        simpleUrlHandlerMapping.setUrlMap(map);

        //Without the order things break :-/
        simpleUrlHandlerMapping.setOrder(10);
        return simpleUrlHandlerMapping;
    }

    @Bean
    public SimpleUrlHandlerMapping handlerMapping() {
        Map<String, Object> urlMap = new HashMap<String, Object>();
        urlMap.put("/sockjs/cobrowse/agent/**", new SockJsHttpRequestHandler(sockJsService,   coBrowseSockJsAgentHandler()));
        urlMap.put("/sockjs/cobrowse/customer/**", new SockJsHttpRequestHandler(sockJsService, coBrowseSockJsCustomerHandler()));
        urlMap.put("/sockjs/cobrowse/admin/**", new SockJsHttpRequestHandler(sockJsService, coBrowseSockJsAdminHandler()));
        SimpleUrlHandlerMapping hm = new SimpleUrlHandlerMapping();
        hm.setOrder(-1);
        hm.setUrlMap(urlMap);
        return hm;
    }
*/

    @Bean
    public WebSocketHandlerAdapter handlerAdapter() {
        return new WebSocketHandlerAdapter(webSocketService());
    }

    @Bean
    public WebSocketService webSocketService() {
        return new HandshakeWebSocketService(new ReactorNettyRequestUpgradeStrategy());
    }

}

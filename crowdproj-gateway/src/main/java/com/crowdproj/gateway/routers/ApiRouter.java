package com.crowdproj.gateway.routers;

import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.nest;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

import com.crowdproj.gateway.handlers.ErrorHandler;
import com.crowdproj.gateway.handlers.ApiHandler;

class ApiRouter {

    private static final String API_PATH = "/api";

    static RouterFunction<?> doRoute(final ApiHandler apiHandler, final ErrorHandler errorHandler) {
        return
            nest(
                path(API_PATH),
                route(POST("/signin"), apiHandler::signin)
                    .andRoute(POST("/signup"), apiHandler::signup)
                    .andRoute(POST("/signupTest"), apiHandler::signupTest)
                    .andRoute(GET("/user/{id}"), apiHandler::getUserById)
                    .andRoute(GET("/user"), apiHandler::getUsers)
                    .andOther(route(RequestPredicates.all(), errorHandler::notFound))
/*
                nest(
                    accept(APPLICATION_JSON),
                    route(GET(LOCATION_WITH_ADDRESS_PATH), apiHandler::getLocation)
                        .andRoute(POST(LOCATION_PATH), apiHandler::postLocation)
                ).andOther(route(RequestPredicates.all(), errorHandler::notFound))
*/
            );
    }
}

package com.crowdproj.gateway.routers;

import org.springframework.web.reactive.function.server.RouterFunction;

import com.crowdproj.gateway.handlers.ErrorHandler;
import com.crowdproj.gateway.handlers.ApiHandler;

public class MainRouter {

    public static RouterFunction<?> doRoute(final ApiHandler handler, final ErrorHandler errorHandler) {
        return StaticRouter.doIndexRoute()
//            .andOther(ApiRouter.doRoute(handler, errorHandler))
            .andOther(StaticRouter.doRoute())
        ;
    }
}

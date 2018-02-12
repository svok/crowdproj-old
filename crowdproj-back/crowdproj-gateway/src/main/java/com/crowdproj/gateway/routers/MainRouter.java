/**
 *
 * Copyright © 2017 Sergey Okatov. All rights reserved.
 * Author: Sergey Okatov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

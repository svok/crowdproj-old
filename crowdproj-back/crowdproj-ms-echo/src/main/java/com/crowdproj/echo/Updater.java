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

package com.crowdproj.echo;

import org.apache.flink.api.common.functions.MapFunction;

import com.crowdproj.common.events.AbstractEventInternal;
import com.crowdproj.common.events.echo.EventEcho;

class Updater implements MapFunction<AbstractEventInternal, AbstractEventInternal> {

    @Override
    public AbstractEventInternal map(AbstractEventInternal event) throws Exception {
        System.out.println("Updater: " + event);
        event.setType("echo.response: ");
        if(event instanceof EventEcho) {
            ((EventEcho)event).setProperty("class", event.getClass().getName());
        }
        return event;
    }
}
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

import { MessageInterface } from './message-interface';

import { WelcomeMessage } from './welcome';
import { ClosedMessage } from './closed';

import { ResponseNewToken } from './response-new-token';

export class MessageFactory {
    static build(obj: Object): MessageInterface {
        if(typeof obj["type"] === "undefined") {
            return null;
        }
        switch(obj["type"]) {
        case "system.welcome":
            return new WelcomeMessage();
        case "system.closed":
            return new ClosedMessage();
        case "session.new-token":
            return new ResponseNewToken(obj);
//        case "system.welcome":
//            return new WelcomeMessage(obj);
        default:
            console.log(obj);
            return null;
        }
    }
}


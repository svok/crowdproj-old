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


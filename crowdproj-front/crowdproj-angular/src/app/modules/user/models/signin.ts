import { MessageInterface } from './message-interface';
import { AbstractMessage } from './abstract-message';

export class Signin extends AbstractMessage implements MessageInterface {
//    static readonly type: string = "user.signin";
    type: string = "user.signin";
    email: string;
    password: string;
}


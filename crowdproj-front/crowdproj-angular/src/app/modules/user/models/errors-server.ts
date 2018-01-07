import { MessageInterface } from './message-interface';
import { AbstractMessage } from './abstract-message';
import { Error } from './error';

export class ErrorsServer extends AbstractMessage implements MessageInterface {
//    static readonly type: string = "system.error";
    type: string = "system.error";
    errors: Error[];
}


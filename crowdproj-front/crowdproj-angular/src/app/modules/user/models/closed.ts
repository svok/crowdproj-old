import { MessageInterface } from './message-interface';
import { AbstractMessage } from './abstract-message';

export class ClosedMessage extends AbstractMessage implements MessageInterface {
    type: string = "system.closed";

    constructor() {
        super();
    }
}


import { MessageInterface } from './message-interface';
import { AbstractMessage } from './abstract-message';

export class WelcomeMessage extends AbstractMessage implements MessageInterface {
    type: string = "system.welcome";

    constructor() {
        super();
    }
}


import { MessageInterface } from './message-interface';

export class AbstractMessage implements MessageInterface {
    type: string;
    relates: string;
}


import { MessageInterface } from './message-interface';

export interface RequestInterface extends MessageInterface {
    stringify();
}

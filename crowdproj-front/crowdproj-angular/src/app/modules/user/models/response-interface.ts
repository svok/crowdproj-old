import { MessageInterface } from './message-interface';

export interface ResponseInterface extends MessageInterface {
    id: number;
    timestamp: number;
}

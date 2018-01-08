import { ResponseInterface } from './response-interface';
import { AbstractMessage } from './abstract-message';

export class AbstractResponse extends AbstractMessage implements ResponseInterface {
    id: number;
    timestamp: number;

    constructor() {
        super();
    }
}


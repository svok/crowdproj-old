import { RequestInterface } from './request-interface';
import { AbstractMessage } from './abstract-message';

export class AbstractRequest extends AbstractMessage implements RequestInterface {
    constructor() {
        super();
    }

    public stringify(): string {
        return JSON.stringify(this);
    }
}

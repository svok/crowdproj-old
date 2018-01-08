import { RequestInterface } from './request-interface';
import { AbstractRequest } from './abstract-request';

export class RequestRequestToken extends AbstractRequest implements RequestInterface {
    type: string = "session.request-token";

    constructor() {
        super();
    }
}


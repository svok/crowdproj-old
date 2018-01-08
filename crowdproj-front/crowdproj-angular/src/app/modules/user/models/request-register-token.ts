import { RequestInterface } from './request-interface';
import { AbstractRequest } from './abstract-request';

export class RequestRegisterToken extends AbstractRequest implements RequestInterface {
    type: string = "session.register-token";
    token: string;

    constructor(token: string) {
        super();
        this.token = token;
    }
}


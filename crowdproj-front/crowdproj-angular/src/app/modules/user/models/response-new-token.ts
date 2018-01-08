import { ResponseInterface } from './response-interface';
import { AbstractResponse } from './abstract-response';

export class ResponseNewToken extends AbstractResponse implements ResponseInterface {
    type: string = "session.new-token";
    token: string;

    constructor(obj: Object) {
        super();
        this.token = obj["token"];
    }
}


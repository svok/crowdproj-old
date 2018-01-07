import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

//import { Observable } from 'rxjs/Observable';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { MessageInterface } from '../models/message-interface';
import { Login } from '../../../models/login';
import { Signin } from '../models/signin';
import { User }  from '../models/user';
import { Reply } from '../../../models/reply';
import { Signup } from '../models/signup';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { Config } from '../../../config';

const WS_URL = 'ws://ws.crowdproj.com/';

@Injectable()
export class AuthWsService {
    public messages: Subject<MessageInterface>;

    isLoggedIn: boolean = false;
    user: User;
//    private prefixUrl = Config.REST_LOGIN;  // URL to web API

    constructor(wsService: WebsocketService) {
        this.messages = <Subject<MessageInterface>>wsService
            .connect(WS_URL)
            .map((response: MessageEvent): MessageInterface => {
                let data = JSON.parse(response.data);
                return {
                    type: data.type,
                    relates: null
                }
            })
        ;
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    check(): Observable<boolean> {
        return Observable.of(this.isLoggedIn);
/*
        const url = `${this.prefixUrl}/check`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(url, {}, {headers: headers})
            .map((result:Response) => this.extractData(result))
//            .catch((error) => this.handleError(error))
        ;
*/
    }

    signup(signup: Signup): Observable<Reply> {
        return null;
/*
        const url = `${this.prefixUrl}/signup`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(url, JSON.stringify(signup), {headers: headers})
            .map((result:Response) => {
                let reply: Reply = result.json();
                return reply;
            })
            .catch((error) => this.handleError(error));
*/
    }

    signin(signin: Signin): Observable<MessageInterface> {
//        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
        return this.messages
            .filter((message: MessageInterface, index: number) => {
                return message.type == "user.user-info" || (message.type == "system.error" && message.relates == "user.signin");
            })
        ;
    }

    signout(): Observable<boolean> {
        return Observable.of(true);
/*
        const url = `${this.prefixUrl}/logout`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(url, {}, {headers: headers})
            .map((result:Response) => this.extractData(result))
            .catch((error) => this.handleError(error));
*/
    }

/*
    private extractData(res: Response) {
        let body = res.json();

        if(body['logged'] == 'in') {
            this.isLoggedIn = true;
        } else if(body['logged'] == 'out'){
            this.isLoggedIn = false;
        }

        if(body['user']) {
            this.user = (new User).import(body['user']);
        }

        if(body['result'] == 'success') {
            return ; //body[field];
        }

        return body || null;
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            let err: string;
            try {
                let body = error.json();
                err = body.error || JSON.stringify(body);
            } catch(e) {
                err = '';
            }
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        this.messageService.sendMessage({
            type: Message.MESSAGE_TYPE_ERROR,
            title: 'Server connection error',
            text: errMsg,
        });

        return Observable.throw(errMsg);
    }
*/
}

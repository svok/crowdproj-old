import { Injectable } from '@angular/core';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {StompService, StompState} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Login } from '../../../models/login';
import { User }  from '../models/user';
import { Jwt }  from '../models/jwt';
import { Reply } from '../../../models/reply';
import { Signup } from '../models/signup';
//import { Message } from '../../../models/message';
//import { MessageService } from '../../../services/message.service';
import { Config } from '../../../config';

@Injectable()
export class WsService {
    isLoggedIn: boolean = false;
    public token: string;
    user: User;
    jwt: Jwt;
    subscription: any;

    constructor (
        private stompService: StompService
//        private messageService: MessageService
    ) {
//        this.user = (new User).import(localStorage.getItem('user'));
//        this.jwt = JSON.parse(localStorage.getItem('jwt'));
        this.token = this.jwt && this.jwt.token;
        this.subscription = this.stompService.subscribe('/auth/states').map((message: Message) => {
            return message.body;
        }).subscribe((msg_body: string) => {
            console.log(`Received: ${msg_body}`);
        });
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    check(): Observable<boolean> {
        this.stompService.publish('/auth/signin', 'My important message');
        return this.subscription;
    }

/*
    signup(signup: Signup): Observable<Reply> {

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
    }

    login(login: Login): Observable<boolean> {
//        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
        const url = `${this.prefixUrl}/login`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(url, JSON.stringify(login), {headers: headers})
            .map((result:Response) => this.extractData(result))
            .catch((error) => this.handleError(error));
    }

    logout(): Observable<boolean> {
        const url = `${this.prefixUrl}/logout`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(url, {}, {headers: headers})
            .map((result:Response) => this.extractData(result))
            .catch((error) => this.handleError(error));
    }

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

/**
 *
 * Copyright © 2017 Sergey Okatov. All rights reserved.
 * Author: Sergey Okatov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Login } from '../../../models/login';
import { User }  from '../models/user';
import { Reply } from '../../../models/reply';
import { Signup } from '../models/signup';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { Config } from '../../../config';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    user: User;
    private prefixUrl = Config.REST_LOGIN;  // URL to web API
    constructor (
        private http: Http,
        private messageService: MessageService
    ) {}

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    check(): Observable<boolean> {
        const url = `${this.prefixUrl}/check`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(url, {}, {headers: headers})
            .map((result:Response) => this.extractData(result))
            .catch((error) => this.handleError(error));
    }

    signup(signup: Signup): Observable<Reply> {
//        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
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
}

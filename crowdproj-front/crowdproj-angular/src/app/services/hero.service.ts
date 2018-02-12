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
import { Hero } from '../models/hero';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { Config } from '../config';

@Injectable()

export class HeroService {
    private prefixUrl = Config.REST_HERO;  // URL to web API
    constructor (
        private http: Http,
        private messageService: MessageService
    ) {}

    getHeroes(): Observable<Hero[]> {
        const url = `${this.prefixUrl}/index`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .get(url)
            .map((result:Response) => this.extractData(result, 'heroes'))
            .catch((error) => this.handleError(error));
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.prefixUrl}/view?id=${id}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .get(url)
            .map((result:Response) => this.extractData(result, 'hero'))
            .catch((error) => this.handleError(error));
    }

    create(hero: Hero): Observable<Hero> {
        const url = `${this.prefixUrl}/create`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(url, JSON.stringify(hero), {headers: headers})
            .map((result:Response) => this.extractData(result, 'hero'))
            .catch((error) => this.handleError(error));
    }

    update(hero: Hero): Observable<Hero> {
        const url = `${this.prefixUrl}/update?id=${hero.id}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(url, JSON.stringify(hero), {headers: headers})
            .map((result:Response) => this.extractData(result, 'hero'))
            .catch((error) => this.handleError(error));
//            .catch(this.handleError);
    }

    delete(hero: Hero): Observable<boolean> {
        const url = `${this.prefixUrl}/delete?id=${hero.id}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(url, '', {headers: headers})
            .map((result:Response) => this.extractData(result, 'result'))
            .catch((error) => this.handleError(error));
//            .catch(this.handleError);
    }

    search(term: string): Observable<Hero[]> {
        const url = `${this.prefixUrl}/search?term=${term}`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .get(url)
            .map((result:Response) => this.extractData(result, 'heroes'))
            .catch((error) => this.handleError(error));
//            .catch(this.handleError);
    }


    private extractData(res: Response, field: string) {
        let body = res.json();
        if(body[field]) {
            return body[field];
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

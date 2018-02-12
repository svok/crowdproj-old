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

import { Injectable }                           from "@angular/core";
import { Subject, Observable, Subscription }    from 'rxjs/Rx';
import { WebSocketSubject }                     from "rxjs/observable/dom/WebSocketSubject";

import { MessageInterface } from '../models/message-interface';
import { RequestInterface } from '../models/request-interface';
import { MessageFactory } from '../models/message-factory';
import { ClosedMessage } from '../models/closed';
import { WelcomeMessage } from '../models/welcome';

@Injectable()
export class WebSocketService {

    private ws: WebSocketSubject<Object>;
    private socket: Subscription;
    private url: string;

    public message: Subject<MessageInterface> = new Subject();
    public opened: Subject<boolean> = new Subject();

    public close(): void {
        this.socket.unsubscribe();
        this.ws.complete();
    }

    public sendMessage(message: RequestInterface): void {
        let str: string = message.stringify();
        console.log("sending a message: " + str);
        this.ws.next(str);
    }

    public connect(url: string): Subject<MessageInterface> {
        let self = this;

        this.url = url;
        this.ws = Observable.webSocket({
            url: this.url,
            openObserver: {
                next: value => {
                    console.log("connected, generating welcome message");
                    this.message.next(new WelcomeMessage());
                }
            }
        });
        this.socket = this.ws.subscribe({

            next: (data:MessageEvent) => {
                this.message.next(MessageFactory.build(data));
            },

            error: (err: any) => {
                console.log("websocket error");
                console.log(err);

                self.opened.next(false);
                this.message.next(new ClosedMessage());

                self.socket.unsubscribe();

                setTimeout(() => {
                    self.connect(self.url);
                }, 1000);

            },

            complete: () => {
                this.message.next(new ClosedMessage());
            }

        });

        return this.message;
    }

}

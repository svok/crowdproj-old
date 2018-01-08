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
        console.log("sendins a message: " + str);
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

            error: () => {

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

import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {
    constructor() { }

    private subject: Rx.Subject<MessageEvent>;

    public connect(url, dataOnOpen?: Object): Rx.Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create(url, dataOnOpen);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    }

    private create(url, dataOnOpen: Object): Rx.Subject<MessageEvent> {
        let ws = new WebSocket(url);

        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        }

        let observable = Rx.Observable.create(
            (obs: Rx.Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                if(typeof dataOnOpen !== 'undefined') {
                    ws.send(JSON.stringify(dataOnOpen));
                }
                return ws.close.bind(ws);
            }
        )

        return Rx.Subject.create(observer, observable);
    }

}

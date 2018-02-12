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

@Injectable()
export class WebSocketService {

    private ws: WebSocketSubject<Object>;
    private socket: Subscription;
    private url: string;

    public message: Subject<Object> = new Subject();
    public opened: Subject<boolean> = new Subject();

    public close():void{
        this.socket.unsubscribe();
        this.ws.complete();
    }

    public sendMessage( message:string ):void{
        this.ws.next( message );
    }

    public start( url: string ):void{
        let self = this;

        this.url = url;

        this.ws = Observable.webSocket( this.url );

        this.socket = this.ws.subscribe( {

            next: ( data:MessageEvent ) => {
                if( data[ 'type' ] == 'welcome' ){
                    self.opened.next( true );
                }
                this.message.next( data );
            },
            error: () => {

                self.opened.next( false );
                this.message.next( { type: 'closed' } );

                self.socket.unsubscribe();

                setTimeout( () => {
                    self.start( self.url );
                }, 1000 );

            },
            complete: () => {
                this.message.next( { type: 'closed' } );
            }

        });

    }

}

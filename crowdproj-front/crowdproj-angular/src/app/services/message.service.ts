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
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { Message }    from '../models/message';

var messages: Message[] = [];

@Injectable()

export class MessageService {
    messageCounter: number = 0;
    messages: Message[] = [];
    private subject = new Subject<Message[]>();

    sendMessage(message: Message) {
        if(message != null) {
            message.id = this.messageCounter++;
            this.messages.push(message);
            this.subject.next(this.messages);
        }
    }

/*
    clearMessage() {
        this.subject.next();
    }
*/

    getMessages(): Observable<Message[]> {
        return this.subject.asObservable();
    }

    getMessage(id: number): Message {
        let messages = this.messages.filter(message => message.id == id);
        return messages[0];
    }
}

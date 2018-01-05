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

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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
//import { MdDialog, MdDialogRef } from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { MessageDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-message-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css'],
})


export class MessageIconComponent implements OnInit , OnDestroy {
    modalOpen: boolean = false;
    subscription: Subscription;
    messageClass: string = '';
    messageCount: number = 0;
    messages: Message[] = [];

    constructor(
        private messageService: MessageService,
//        public dialog: MdDialog
        private modalService: NgbModal
    ) {
    }

    openMessagesDialog(content) {
        /*
        let dialogRef = this.dialog.open(MessageDialogComponent, {
        //    height: '400px',
        //    width: '600px',
            data: {
                messages: this.messages
            }
        });
        */
        this.modalService.open(content).result.then((result) => {
            // this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    ngOnInit() {
        this.subscription = this.messageService
            .getMessages()
            .subscribe(messages => this.receiveMessages(messages))
        ;

    }

    receiveMessages(messages: Message[]) {
        console.log('message component receiveMessage');
        console.log(this.messages.length);
        this.messages = messages;
        let messageType = messages.reduce(function(prevType, message) {
            if(message.type === Message.MESSAGE_TYPE_ERROR || prevType === Message.MESSAGE_TYPE_ERROR) {
                return Message.MESSAGE_TYPE_ERROR;
            } else if(message.type === Message.MESSAGE_TYPE_ALERT || prevType === Message.MESSAGE_TYPE_ALERT) {
                return Message.MESSAGE_TYPE_ALERT;
            } else if(message.type === Message.MESSAGE_TYPE_WARNING || prevType === Message.MESSAGE_TYPE_WARNING) {
                return Message.MESSAGE_TYPE_WARNING;
            } else if(message.type === Message.MESSAGE_TYPE_INFO || prevType === Message.MESSAGE_TYPE_INFO) {
                return Message.MESSAGE_TYPE_INFO;
            } else {
                return Message.MESSAGE_TYPE_DEBUG;
            }
        }, Message.MESSAGE_TYPE_DEBUG);
        this.messageCount = messages.filter(message => message.type === messageType).length;
        this.messageClass = Message.messageTypesMap[messageType];
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}

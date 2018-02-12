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

import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
//import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
//import { MessageComponent } from '../message.component';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})


export class MessageDialogComponent {
    messages: Message[] = [];
    constructor(
//        @Inject(MD_DIALOG_DATA) public data: any,
//        public dialogRef: MdDialogRef<MessageDialogComponent>
        private messageService: MessageService,
        private modalService: NgbModal
    ) {
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            // this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return    `with: ${reason}`;
        }
    }
}

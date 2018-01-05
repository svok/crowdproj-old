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

import { Component, Input, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
//import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Router }      from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
//import { AuthService } from '../../../services/auth.service';
//import { TitleService } from '../../../services/title.service';
//import { MessageService } from '../../../services/message.service';

import { UserComponent } from '../user.component';

@Component({
    selector: 'app-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class UserProfileComponent extends UserComponent {
    isRequesting: boolean = false;

    ngOnInit(): void {
        this.titleService.setTitle('Profile');
    }

    ngOnDestroy(): void {
    }

}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
//import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Router }      from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Signup }      from '../models/signup';
import { Login }       from '../models/login';
import { TitleService } from '../../../services/title.service';
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

import { UserComponent } from '../user.component';

@Component({
    selector: 'app-user-signout',
    templateUrl: './signout.component.html',
    styleUrls: ['./signout.component.css']
})
export class UserSignoutComponent extends UserComponent {
    isRequesting: boolean = false;

    ngOnInit(): void {
        this.titleService.setTitle('Sign out');
        this.signout();
    }

    ngOnDestroy(): void {
    }

    signout() {
        this.isRequesting = true;
        this.authService.logout().subscribe(() => {
            this.isRequesting = false;
            if (! this.authService.isLoggedIn) {
                this.router.navigate(['/']);
            }
        });
    }

}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
//import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Login }       from '../models/login';
/*
import { Router }      from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Signup }      from '../models/signup';
import { TitleService } from '../../../services/title.service';
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs/Subscription';
*/

import { UserComponent } from '../user.component';

@Component({
    selector: 'app-user-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class UserSigninComponent extends UserComponent {
    @Input() loginDat: Login = {email: "", password: ""};
    isRequesting: boolean = false;

    emailRegex: String = "^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$";

    //emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    ngOnInit(): void {
        this.titleService.setTitle('Sign in');
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
//        this.routeSub.unsubscribe();
    }

    login() {
        this.isRequesting = true;
        this.authService.login(this.loginDat).subscribe(() => {
            this.isRequesting = false;
            if (this.authService.isLoggedIn) {
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
                this.router.navigate([redirect]);
            }
        });
    }

}

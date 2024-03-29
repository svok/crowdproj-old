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

import { Component, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

import { Router }      from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthWsService } from './services/auth-ws.service';
import { Signup }      from './models/signup';
import { Login }       from './models/login';
import { TitleService } from '../../services/title.service';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

import {StompService, StompState} from '@stomp/ng2-stompjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent {

    public state: Observable<string>;

    @Input() loginDat: Login = {email: "", password: ""};
    @Input() signupDat: Signup = {email: "", password: "", password1: "", fname: "", lname: "", mname: ""};
    message: string;
    routeSub: Subscription;

    emailRegex: String = "^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$";

    //emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(
        public authService: AuthService,
        public authWsService: AuthWsService,
        protected titleService: TitleService,
        protected messageService: MessageService,
        protected route: ActivatedRoute,
        public router: Router
    ) {
        authWsService.messages.subscribe(msg => {
            console.log("Response from websocket: " + msg);
        });
    }

    ngOnInit(): void {
        this.titleService.setTitle('Signing In');
//        this.state = this.stompService.state
//            .map((state: number) => StompState[state]);
//        this.wsService.check();
        this.authWsService.check();
    }

    ngAfterViewInit(): void {
//        this.routeSub = this.route.params
//            .subscribe((params: Params) =>  this.switchTo(params['operation']));
    }

    ngOnDestroy(): void {
//        this.routeSub.unsubscribe();
    }

    login() {
        this.message = 'Trying to log in ...';
        this.authService.login(this.loginDat).subscribe(() => {
            this.message = null;
            if (this.authService.isLoggedIn) {
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
                this.router.navigate([redirect]);
            }
        });
    }

    logout() {
        this.authService.logout().subscribe(() => {
            if (! this.authService.isLoggedIn) {
                this.router.navigate(['/']);
            }
        });
    }

    switchTo(subRoute: string) {
        switch(subRoute) {
        case "signin":
            if(! this.authService.isLoggedIn) {
                this.titleService.setTitle('Вход');
                // this.tabGroup.selectedIndex = 0;
                return;
            }
            break;
        case "signup":
            if(! this.authService.isLoggedIn) {
                this.titleService.setTitle('Регистрация');
                // this.tabGroup.selectedIndex = 1;
                return;
            }
            break;
        case "signout":
            if(this.authService.isLoggedIn) {
                this.logout();
                return;
            }
            break;
        case "profile":
            if(this.authService.isLoggedIn) {
                this.titleService.setTitle('Профиль');
                return;
            }
            break;
        }

        if(this.authService.isLoggedIn) {
            // use profile
            this.router.navigate(['/user/profile']);
            return;
        } else {
            // use login
            if(! this.authService.redirectUrl && subRoute) {
                this.authService.redirectUrl = '/user/' + subRoute;
            }
            this.router.navigate(['/user/signin']);
            // this.tabGroup.selectedIndex = 0;
        }
    }

    signup() {
        this.authService.signup(this.signupDat).subscribe((reply) => {
            if(reply.result == 'success') {
                this.switchTo('signin');
            }
        });
    }
}

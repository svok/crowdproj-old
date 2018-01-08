import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
//import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard }            from './services/auth-guard.service';
import { AuthService }          from './services/auth.service';
import { AuthWsService }          from './services/auth-ws.service';
import { WebSocketService }          from './services/websocket.service';

import { UserRouting }            from './user.routing';
import { UserComponent }          from './user.component';
import { UserProfileComponent }   from './profile/profile.component';
import { UserSigninComponent }    from './signin/signin.component';
import { UserSignupComponent }    from './signup/signup.component';
import { UserSignoutComponent }   from './signout/signout.component';

import {StompConfig, StompService} from '@stomp/ng2-stompjs';

const stompConfig: StompConfig = {
  // Which server?
  url: 'ws://ws.crowdproj.com/',

  // Headers
  // Typical keys: login, passcode, host
  headers: {
//    login: 'guest',
//    passcode: 'guest'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 5000 (5 seconds)
  reconnect_delay: 5000,

  // Will log diagnostics on console
  debug: true
};

@NgModule({
    declarations: [
        UserComponent,
        UserProfileComponent,
        UserSigninComponent,
        UserSignupComponent,
        UserSignoutComponent
    ],
    imports: [
//        BrowserModule,
//        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
//        JsonpModule,
        UserRouting,

        NgbModule.forRoot(),
        CommonModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        AuthWsService,
        WebSocketService,
        StompService,
        {
            provide: StompConfig,
            useValue: stompConfig
        }
    ]
})
export class UserModule { }

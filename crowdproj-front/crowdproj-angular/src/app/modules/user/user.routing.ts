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

//import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }            from './services/auth-guard.service';
//import { AuthService }          from './services/auth.service';
import { UserComponent }        from './user.component';
import { UserProfileComponent }  from './profile/profile.component';
import { UserSigninComponent }  from './signin/signin.component';
import { UserSignupComponent }  from './signup/signup.component';
import { UserSignoutComponent } from './signout/signout.component';

const userRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        data: {breadcrumb: 'User'},
        children: [
            {
                path: '',
                component: UserProfileComponent,
                canActivate: [AuthGuard],
                runGuardsAndResolvers: 'always',
                data: {breadcrumb: false},
                pathMatch: 'full'
            },
            {
                path: 'signin',
                component: UserSigninComponent,
                data: {breadcrumb: 'Sign in'},
                pathMatch: 'full'
            },
            {
                path: 'signup',
                component: UserSignupComponent,
                data: {breadcrumb: 'Sign up'},
                pathMatch: 'full'
            },
            {
                path: 'signout',
                component: UserSignoutComponent,
                canActivate: [AuthGuard],
                runGuardsAndResolvers: 'always',
                data: {breadcrumb: 'Sign out'},
                pathMatch: 'full'
            }
        ]
    }
];

/*
@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AuthService
    ]
})
*/

//export class UserRoutingModule {}
export const UserRouting = RouterModule.forChild(userRoutes);

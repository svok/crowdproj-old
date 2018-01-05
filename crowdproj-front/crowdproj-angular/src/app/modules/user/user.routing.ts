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

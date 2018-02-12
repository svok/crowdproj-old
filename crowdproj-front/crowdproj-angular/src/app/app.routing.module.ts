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

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }             from './modules/user/services/auth-guard.service';

import { ErrorComponent }       from './error/error.component';
import { HomeComponent }        from './home/home.component';
import { DashboardComponent }   from './home/dashboard/db.component';

import { HeroesComponent }      from './home/heroes/heroes.component';
import { HeroesListComponent }  from './home/heroes/list/list.component';
import { HeroesDetailComponent} from './home/heroes/detail/detail.component';
import { HeroesViewComponent}   from './home/heroes/view/view.component';
import { HeroesCreateComponent} from './home/heroes/update/create.component';
import { HeroesUpdateComponent} from './home/heroes/update/update.component';
import { HeroesSearchComponent} from './home/heroes/search/search.component';

import { MessageComponent }      from './home/message/message.component';
import { MessageListComponent }  from './home/message/list/list.component';
import { MessageDetailComponent} from './home/message/detail/detail.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        data: {breadcrumb: 'Главная'},
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: {breadcrumb: false, noBack: true},
                pathMatch: 'full'
            },
            {
                path: 'heroes',
                component: HeroesComponent,
                data: {breadcrumb: 'Heroes'},
                children: [
                    {
                        path: '',
                        component: HeroesListComponent,
                        data: {breadcrumb: false},
                        pathMatch: 'full'
                    },
                    {
                        path: 'create',
                        component: HeroesCreateComponent,
                        data: {breadcrumb: 'Create'},
                    },
                    {
                        path: ':id',
                        component: HeroesDetailComponent,
                        data: {breadcrumb: 'Detail'},
                        children: [
                            {
                                path: '',
                                component: HeroesViewComponent,
                                data: {breadcrumb: false},
                                pathMatch: 'full'
                            },
                            {
                                path: 'update',
                                component: HeroesUpdateComponent,
                                data: {breadcrumb: 'Update'},
                            }
                        ]
                    }
                ]
            },
            {
                path: 'message',
                component: MessageComponent,
                data: { breadcrumb: 'Сообщения' },
                children: [
                    {
                        path: '',
                        component: MessageListComponent,
                        data: {breadcrumb: false},
                        pathMatch: 'full'
                    },
                    {
                        path: ':id',
                        data: {breadcrumb: 'Message'},
                        component: MessageDetailComponent
                    }
                ]
            },
            {
                path: '**',
                component: ErrorComponent,
                data: {code: 404, breadcrumb: 'Ошибка'}
            }
        ]
    }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

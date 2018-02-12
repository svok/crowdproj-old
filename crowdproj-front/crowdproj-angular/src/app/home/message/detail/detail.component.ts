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

// Keep the Input import for now, you'll remove it later:
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { TitleService } from '../../../services/title.service';
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Message } from '../../../models/message';

@Component({
    selector: 'app-message-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})

export class MessageDetailComponent implements OnInit, OnDestroy {
    @Input() message: Message;
    routeSub: Subscription;

    constructor(
        private titleService: TitleService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Message Detail');
        this.routeSub = this.route.params
            .subscribe((params: Params) => {
                let message = this.messageService.getMessage(+params['id']);
                if(message === null || message === undefined) {
                    this.router.navigate(['/error',404]);
                } else {
                    this.message = message;
                }
            });


/*
            .switchMap((params: Params) => this.heroService.getHero(+params['id']))
            .subscribe(hero => {
                this.hero = hero;
                this.titleService.setTitle(hero.name);
            });
*/
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

}

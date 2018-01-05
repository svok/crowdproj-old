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

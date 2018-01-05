// Keep the Input import for now, you'll remove it later:
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { HeroService } from '../../../services/hero.service';
import { TitleService } from '../../../services/title.service';
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/switchMap';

import { Hero } from '../../../models/hero';

@Component({
  selector: 'app-heroes-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class HeroesViewComponent implements OnInit, OnDestroy {
    @Input() hero: Hero;
    errorMessage: string;
    routeSub: Subscription;

    constructor(
      private heroService: HeroService,
      private titleService: TitleService,
      private messageService: MessageService,
      private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('Hero Detail');
        this.routeSub = this.route.parent.params
            .switchMap((params: Params) => this.heroService.getHero(+params['id']))
            .subscribe(hero => {
                this.hero = hero;
                this.route.parent.data['breadcrumb'] = hero.name;
                this.titleService.setTitle(hero.name);
            });
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

}

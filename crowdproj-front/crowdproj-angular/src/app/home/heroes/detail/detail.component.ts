import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { HeroService } from '../../../services/hero.service';

import { Hero } from '../../../models/hero';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class HeroesDetailComponent implements OnInit, OnDestroy {

    constructor(
      private heroService: HeroService,
      private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
/*
        this.routeSub = this.route.params
            .switchMap((params: Params) => this.heroService.getHero(+params['id']))
            .subscribe(hero => {
                this.hero = hero;
            });
*/
    }

    ngOnDestroy(): void {
    }
}

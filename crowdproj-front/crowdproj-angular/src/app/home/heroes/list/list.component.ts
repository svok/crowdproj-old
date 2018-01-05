import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../../services/hero.service';
import { TitleService } from '../../../services/title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class HeroesListComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  errorMessage: string;

    constructor(
        private router: Router,
        private heroService: HeroService,
        private titleService: TitleService
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('List of Heroes');
        this.getHeroes();
    }

    getHeroes() {
        this.heroService
            .getHeroes()
            .subscribe(
                heroes => this.heroes = heroes,
                error =>  this.errorMessage = <any>error
            );
    }

    add(name: string) {
        let hero = new Hero;
        hero.name = name;
        this.heroService
            .create(hero)
            .subscribe(
                hero => {
                    this.selectedHero = hero;
                    this.getHeroes();
//                    this.gotoDetail();
                },
                error =>  this.errorMessage = <any>error
            );
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero)
            .subscribe(
                result => {
                    if(result) {
                        if(this.selectedHero.id === hero.id) {
                            this.selectedHero = null;
                        }
                        this.getHeroes();
                    }
                },
                error =>  this.errorMessage = <any>error
            );
    }
}


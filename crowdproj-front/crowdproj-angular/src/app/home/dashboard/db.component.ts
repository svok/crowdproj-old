import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './db.component.html',
  styleUrls: ['./db.component.css']
})

export class DashboardComponent implements OnInit {
    errorMessage: string = null;
    heroes: Hero[] = [];
    constructor(
        private heroService: HeroService,
        private titleService: TitleService
    ) {
        this.titleService.setTitle('');
    }
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService
        .getHeroes()
        .subscribe(
          heroes => this.heroes = heroes.slice(1, 5),
          error =>  this.errorMessage = <any>error
        );
  }

}
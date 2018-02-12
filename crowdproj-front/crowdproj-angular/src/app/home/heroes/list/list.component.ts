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


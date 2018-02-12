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
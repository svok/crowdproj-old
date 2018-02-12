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
import { Location }                 from '@angular/common';
import { HeroService } from '../../../services/hero.service';
import { TitleService } from '../../../services/title.service';
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/switchMap';
import {FormControl, Validators} from '@angular/forms';

import { Hero } from '../../../models/hero';

@Component({
  selector: 'app-heroes-create',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class HeroesCreateComponent implements OnInit, OnDestroy {
    @Input() hero: Hero = new Hero;
    @Input() nameFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я- ]+$/)]);
    errorMessage: string;
    routeSub: Subscription;

    constructor(
      private heroService: HeroService,
      private titleService: TitleService,
      private messageService: MessageService,
      private route: ActivatedRoute,
      private location: Location
    ) {
    }

    ngOnInit(): void {
        this.titleService.setTitle('Create hero');
    }

    ngOnDestroy(): void {
    }

    onSubmit() {
        this.create();
    }

    create(): void {
        this.heroService.create(this.hero).subscribe(
            result => this.location.back(),
            error => this.errorMessage = <any>error
        );
    }
}

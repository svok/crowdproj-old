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
import { ActivatedRoute, Params }   from '@angular/router';
import { OnInit } from '@angular/core';
import { Error } from '../models/error';
import { ERRORS } from '../models/mock-errors';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})



export class ErrorComponent implements OnInit {
    title = 'Error';
    error: Error;

    constructor(
        private route: ActivatedRoute,
        private titleService: TitleService
    ) {}

    ngOnInit(): void {
        let code = this.route.snapshot.data['code'];
        this.error = ERRORS.find(error => error.code === code);
        this.titleService.setTitle('Error: '.concat(code.toString()));
    }

}


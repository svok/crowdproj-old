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

import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
//import 'rxjs/add/observable/fromEvent';

@Injectable()

export class TemplateService {
    protected obs: Observable<string>;

    public constructor() {
/*
        this.obs = Observable.merge(
                Observable.of(null),
                Observable.fromEvent(window, 'resize'),
                Observable.fromEvent(window, 'orientationchange')
            )
            .map((event:any) => this.detectTemplate(event));
*/
        this.obs = Observable.of(null)
            .map((event:any) => this.detectTemplate(event));
    }

    getTemplate(): Observable<string> {
        return this.obs;
    }

    detectTemplate(event: any): string {
        return "desktop";
/*
        let w = window;
        let d = document;
        let e = d.documentElement;
        let g = d.getElementsByTagName('body')[0];
        let width = w.innerWidth || e.clientWidth || g.clientWidth;
        let height = w.innerHeight|| e.clientHeight|| g.clientHeight;

        if(width <= 480) {
            this.template = "mobile-portrait";
        } else if(height <= 480) {
            this.template = "mobile-landscape";
        } else {
            this.template = "desktop";
        }

        if (window.matchMedia("(orientation: portrait)").matches) {
            this.isPortrait = true;
        } else {
            this.isPortrait = false;
        }
*/
    }

}


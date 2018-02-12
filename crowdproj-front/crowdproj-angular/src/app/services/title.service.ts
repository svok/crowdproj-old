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
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { Title }      from '@angular/platform-browser';
import { Config }     from '../config';

@Injectable()

export class TitleService {
    private subject = new Subject<string>();

    public constructor(private titleService: Title ) {}

    setTitle(title: string) {
        this.subject.next(title);

        let gtitle:string;
        if(title == null || title == '') {
            gtitle = Config.APP_NAME;
        } else {
            gtitle = title + ' - ' + Config.APP_NAME;
        }
        this.titleService.setTitle(gtitle);
    }

    getTitle(): Observable<string> {
        return this.subject.asObservable();
    }
}


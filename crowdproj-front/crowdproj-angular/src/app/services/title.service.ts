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


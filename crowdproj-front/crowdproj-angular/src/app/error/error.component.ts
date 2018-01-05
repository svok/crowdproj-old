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


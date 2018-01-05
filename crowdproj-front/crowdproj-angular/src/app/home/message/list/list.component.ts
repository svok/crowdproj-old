import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { TitleService } from '../../../services/title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class MessageListComponent implements OnInit {
    constructor(
        private router: Router,
        public messageService: MessageService,
        private titleService: TitleService
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle('List of Messages');
    }
}


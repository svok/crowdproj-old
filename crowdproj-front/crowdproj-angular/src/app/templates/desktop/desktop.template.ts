import { Component, ViewChild } from '@angular/core';
import { Template } from '../template';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.template.html',
  styleUrls: ['./desktop.template.css']
})

export class DesktopTemplate extends Template {
//    @ViewChild(UserProfile) userProfile: UserProfile
    isCollapsed = true;
    toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
    }

    ngOnInit() {
        document.addEventListener('click', this.offClickHandler.bind(this));
        super.ngOnInit();
    }

    offClickHandler(event:any) {
        if(! event.target.closest(".navbar-toggler") && ! this.isCollapsed) {
            this.isCollapsed = true;
        }
    }
}

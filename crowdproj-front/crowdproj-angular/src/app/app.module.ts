import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TemplateService } from './services/template.service';
import { MessageService } from './services/message.service';
import { TitleService } from './services/title.service';
import { HeroService } from './services/hero.service';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { DesktopTemplate } from './templates/desktop/desktop.template';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/db.component';

import { HeroesComponent } from './home/heroes/heroes.component';
import { HeroesListComponent } from './home/heroes/list/list.component';
import { HeroesDetailComponent} from './home/heroes/detail/detail.component';
import { HeroesViewComponent}   from './home/heroes/view/view.component';
import { HeroesCreateComponent} from './home/heroes/update/create.component';
import { HeroesUpdateComponent} from './home/heroes/update/update.component';
import { HeroesSearchComponent } from './home/heroes/search/search.component';

import { MessageComponent }       from './home/message/message.component';
import { MessageListComponent }   from './home/message/list/list.component';
import { MessageDetailComponent } from './home/message/detail/detail.component';
import { MessageIconComponent }   from './home/message/icon/icon.component';
import { MessageDialogComponent } from './home/message/dialog/dialog.component';

import { UserModule } from './modules/user/user.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule }   from './app.routing.module';

@NgModule({
    declarations: [
        DesktopTemplate,

        ErrorComponent,
        HomeComponent,
        DashboardComponent,

        HeroesComponent,
        HeroesListComponent,
        HeroesDetailComponent,
        HeroesViewComponent,
        HeroesCreateComponent,
        HeroesUpdateComponent,
        HeroesSearchComponent,

        MessageComponent,
        MessageListComponent,
        MessageDialogComponent,
        MessageIconComponent,
        MessageDetailComponent,

        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        UserModule,
        AppRoutingModule,

        NgbModule.forRoot()
    ],
    providers: [
        Title,
        Location,
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        TemplateService,
        MessageService,
        HeroService,
        TitleService
    ],
    entryComponents: [MessageDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

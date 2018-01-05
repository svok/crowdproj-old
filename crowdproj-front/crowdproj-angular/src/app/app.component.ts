import { Component } from '@angular/core';
import { OnInit, OnDestroy }    from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, UrlSegment} from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Config } from './config';
import { AuthService } from './modules/user/services/auth.service';
import { TemplateService } from './services/template.service';
import { TitleService } from './services/title.service';
import { MessageIconComponent } from './home/message/icon/icon.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
    template: string;
    showBack: boolean = true;
    isHome: boolean = true;
    title: string = '';
    titleSub: Subscription;
    routerSub: Subscription;
    breadcrumbs: {
        name: string;
        url: string
    }[] = [];

    public constructor(
        public authService: AuthService,
        public templateService: TemplateService,
        private titleService: TitleService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        this.templateService.getTemplate().subscribe(template => {this.template = template});
        this.authService.check().subscribe(() => {
            if (this.authService.isLoggedIn && this.authService.redirectUrl) {
                this.router.navigate([this.authService.redirectUrl]);
            }
        });
        this.titleSub = this.titleService.getTitle().subscribe(title => {
            if(title == '' || title == null) {
                this.title = Config.APP_NAME;
            } else {
                this.title = title;
            }
        });
        this.routerSub = this.router.events.subscribe(event => {
            this.breadcrumbs = [];
            this.parseRoute(this.router.routerState.snapshot.root);
        });
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.titleSub.unsubscribe();
        this.routerSub.unsubscribe();
    }

    parseRoute(node: ActivatedRouteSnapshot) {
        this.showBack = node.data['noBack'] !== true;
        if (node.data['breadcrumb']) {
            let urlSegments: UrlSegment[] = [];
            node.pathFromRoot.forEach(routerState => {
                urlSegments = urlSegments.concat(routerState.url);
            });
            let url = urlSegments.map(urlSegment => {
                return urlSegment.path;
            }).join('/');
            this.breadcrumbs.push({
                name: node.data['breadcrumb'],
                url: '/' + url
            })
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    }

    goBack(): void {
      this.location.back();
    }

}

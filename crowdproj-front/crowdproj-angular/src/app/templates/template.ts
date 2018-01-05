import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, UrlSegment} from '@angular/router';
import { Location } from '@angular/common';
import { TitleService } from '../services/title.service';
import { AuthService } from '../modules/user/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Config } from '../config';

export class Template implements OnInit, OnDestroy {
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
        @Inject(AuthService) public authService: AuthService,
        @Inject(TitleService) protected titleService: TitleService,
        @Inject(Router) protected router: Router,
        @Inject(ActivatedRoute) protected activatedRoute: ActivatedRoute,
        @Inject(Location) protected location: Location
    ) {}

    ngOnInit() {
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

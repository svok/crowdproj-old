webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h1 {\n  font-size: 1.2em;\n  color: #999;\n  margin-bottom: 0;\n}\nh2 {\n  font-size: 2em;\n  margin-top: 0;\n  padding-top: 0;\n}\n\n.footer-toolbar,\n.header-toolbar {\n    position: fixed;\n    z-index: 999;\n}\n\n.portrait .header-toolbar {\n    width: 100%;\n    height: 56px;\n    top: 0px;\n    left: 0px;\n    right: 0px;\n}\n.portrait .footer-toolbar {\n    width: 100%;\n    height: 56px;\n    bottom: 0px;\n    left: 0px;\n    right: 0px;\n}\n.portrait .app-content {\n    width: 100%;\n    padding-top: 56px;\n    padding-bottom: 56px;\n}\n\n.portrait .app-sidenav {\n    top: 56px;\n    bottom: 56px;\n    left: 0;\n    height: calc(100% - 112px);\n}\n\n.landscape .header-toolbar {\n    height: 100%;\n    width: 56px;\n    top: 0px;\n    bottom: 0px;\n    left: 0px;\n}\n.landscape .footer-toolbar {\n    height: 100%;\n    width: 56px;\n    top: 0px;\n    bottom: 0px;\n    right: 0px;\n}\n.landscape .app-content {\n    width: calc(100% - 128px);\n    overflow: hidden;\n    padding-left: 56px;\n    padding-right: 56px;\n}\n\n.landscape .header-toolbar >>> .mat-toolbar-row,\n.landscape .footer-toolbar >>> .mat-toolbar-row {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important;\n}\n\n.landscape .rotatable {\n    -webkit-transform: rotate(-90deg) translateX(-50%);\n            transform: rotate(-90deg) translateX(-50%);\n//    transform: rotate(180deg);\n//    writing-mode: vertical-rl;\n//    width: auto;\n//    max-width: 56px;\n//    height: auto;\n}\n\n.landscape .app-sidenav {\n    left: 56px;\n    height: 100%;\n}\n\n.landscape .title {\n    min-height: 120px;\n    max-height: 300px;\n    text-align: right;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--app-mobile-landscape *ngIf=\"template == 'mobile-landscape'\">\n    <router-outlet></router-outlet>\n</app-mobile-landscape>\n<app-mobile-portrait *ngIf=\"template == 'mobile-portrait'\">\n    <router-outlet></router-outlet>\n</app-mobile-portrait-->\n<app-desktop *ngIf=\"template == 'desktop'\">\n    <router-outlet></router-outlet>\n</app-desktop>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__("../../../../../src/app/config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_user_services_auth_service__ = __webpack_require__("../../../../../src/app/modules/user/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_template_service__ = __webpack_require__("../../../../../src/app/services/template.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = (function () {
    function AppComponent(authService, templateService, titleService, router, activatedRoute, location) {
        this.authService = authService;
        this.templateService = templateService;
        this.titleService = titleService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.location = location;
        this.showBack = true;
        this.isHome = true;
        this.title = '';
        this.breadcrumbs = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.templateService.getTemplate().subscribe(function (template) { _this.template = template; });
        this.authService.check().subscribe(function () {
            if (_this.authService.isLoggedIn && _this.authService.redirectUrl) {
                _this.router.navigate([_this.authService.redirectUrl]);
            }
        });
        this.titleSub = this.titleService.getTitle().subscribe(function (title) {
            if (title == '' || title == null) {
                _this.title = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* Config */].APP_NAME;
            }
            else {
                _this.title = title;
            }
        });
        this.routerSub = this.router.events.subscribe(function (event) {
            _this.breadcrumbs = [];
            _this.parseRoute(_this.router.routerState.snapshot.root);
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        this.titleSub.unsubscribe();
        this.routerSub.unsubscribe();
    };
    AppComponent.prototype.parseRoute = function (node) {
        this.showBack = node.data['noBack'] !== true;
        if (node.data['breadcrumb']) {
            var urlSegments_1 = [];
            node.pathFromRoot.forEach(function (routerState) {
                urlSegments_1 = urlSegments_1.concat(routerState.url);
            });
            var url = urlSegments_1.map(function (urlSegment) {
                return urlSegment.path;
            }).join('/');
            this.breadcrumbs.push({
                name: node.data['breadcrumb'],
                url: '/' + url
            });
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    };
    AppComponent.prototype.goBack = function () {
        this.location.back();
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__modules_user_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5__services_template_service__["a" /* TemplateService */],
            __WEBPACK_IMPORTED_MODULE_6__services_title_service__["a" /* TitleService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_template_service__ = __webpack_require__("../../../../../src/app/services/template.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_hero_service__ = __webpack_require__("../../../../../src/app/services/hero.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__error_error_component__ = __webpack_require__("../../../../../src/app/error/error.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__templates_desktop_desktop_template__ = __webpack_require__("../../../../../src/app/templates/desktop/desktop.template.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__home_dashboard_db_component__ = __webpack_require__("../../../../../src/app/home/dashboard/db.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__home_heroes_heroes_component__ = __webpack_require__("../../../../../src/app/home/heroes/heroes.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__home_heroes_list_list_component__ = __webpack_require__("../../../../../src/app/home/heroes/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__home_heroes_detail_detail_component__ = __webpack_require__("../../../../../src/app/home/heroes/detail/detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__home_heroes_view_view_component__ = __webpack_require__("../../../../../src/app/home/heroes/view/view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__home_heroes_update_create_component__ = __webpack_require__("../../../../../src/app/home/heroes/update/create.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__home_heroes_update_update_component__ = __webpack_require__("../../../../../src/app/home/heroes/update/update.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__home_heroes_search_search_component__ = __webpack_require__("../../../../../src/app/home/heroes/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__home_message_message_component__ = __webpack_require__("../../../../../src/app/home/message/message.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__home_message_list_list_component__ = __webpack_require__("../../../../../src/app/home/message/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__home_message_detail_detail_component__ = __webpack_require__("../../../../../src/app/home/message/detail/detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__home_message_icon_icon_component__ = __webpack_require__("../../../../../src/app/home/message/icon/icon.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__home_message_dialog_dialog_component__ = __webpack_require__("../../../../../src/app/home/message/dialog/dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__modules_user_user_module__ = __webpack_require__("../../../../../src/app/modules/user/user.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__app_routing_module__ = __webpack_require__("../../../../../src/app/app.routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__templates_desktop_desktop_template__["a" /* DesktopTemplate */],
                __WEBPACK_IMPORTED_MODULE_11__error_error_component__["a" /* ErrorComponent */],
                __WEBPACK_IMPORTED_MODULE_13__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_14__home_dashboard_db_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_15__home_heroes_heroes_component__["a" /* HeroesComponent */],
                __WEBPACK_IMPORTED_MODULE_16__home_heroes_list_list_component__["a" /* HeroesListComponent */],
                __WEBPACK_IMPORTED_MODULE_17__home_heroes_detail_detail_component__["a" /* HeroesDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_18__home_heroes_view_view_component__["a" /* HeroesViewComponent */],
                __WEBPACK_IMPORTED_MODULE_19__home_heroes_update_create_component__["a" /* HeroesCreateComponent */],
                __WEBPACK_IMPORTED_MODULE_20__home_heroes_update_update_component__["a" /* HeroesUpdateComponent */],
                __WEBPACK_IMPORTED_MODULE_21__home_heroes_search_search_component__["a" /* HeroesSearchComponent */],
                __WEBPACK_IMPORTED_MODULE_22__home_message_message_component__["a" /* MessageComponent */],
                __WEBPACK_IMPORTED_MODULE_23__home_message_list_list_component__["a" /* MessageListComponent */],
                __WEBPACK_IMPORTED_MODULE_26__home_message_dialog_dialog_component__["a" /* MessageDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_25__home_message_icon_icon_component__["a" /* MessageIconComponent */],
                __WEBPACK_IMPORTED_MODULE_24__home_message_detail_detail_component__["a" /* MessageDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* JsonpModule */],
                __WEBPACK_IMPORTED_MODULE_27__modules_user_user_module__["a" /* UserModule */],
                __WEBPACK_IMPORTED_MODULE_29__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_28__ng_bootstrap_ng_bootstrap__["c" /* NgbModule */].forRoot()
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["c" /* Title */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common__["f" /* Location */],
                { provide: __WEBPACK_IMPORTED_MODULE_4__angular_common__["g" /* LocationStrategy */], useClass: __WEBPACK_IMPORTED_MODULE_4__angular_common__["h" /* PathLocationStrategy */] },
                __WEBPACK_IMPORTED_MODULE_6__services_template_service__["a" /* TemplateService */],
                __WEBPACK_IMPORTED_MODULE_7__services_message_service__["a" /* MessageService */],
                __WEBPACK_IMPORTED_MODULE_9__services_hero_service__["a" /* HeroService */],
                __WEBPACK_IMPORTED_MODULE_8__services_title_service__["a" /* TitleService */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_26__home_message_dialog_dialog_component__["a" /* MessageDialogComponent */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_user_services_auth_guard_service__ = __webpack_require__("../../../../../src/app/modules/user/services/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__error_error_component__ = __webpack_require__("../../../../../src/app/error/error.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_dashboard_db_component__ = __webpack_require__("../../../../../src/app/home/dashboard/db.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_heroes_heroes_component__ = __webpack_require__("../../../../../src/app/home/heroes/heroes.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_heroes_list_list_component__ = __webpack_require__("../../../../../src/app/home/heroes/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_heroes_detail_detail_component__ = __webpack_require__("../../../../../src/app/home/heroes/detail/detail.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_heroes_view_view_component__ = __webpack_require__("../../../../../src/app/home/heroes/view/view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_heroes_update_create_component__ = __webpack_require__("../../../../../src/app/home/heroes/update/create.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__home_heroes_update_update_component__ = __webpack_require__("../../../../../src/app/home/heroes/update/update.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__home_message_message_component__ = __webpack_require__("../../../../../src/app/home/message/message.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_message_list_list_component__ = __webpack_require__("../../../../../src/app/home/message/list/list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__home_message_detail_detail_component__ = __webpack_require__("../../../../../src/app/home/message/detail/detail.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_4__home_home_component__["a" /* HomeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__modules_user_services_auth_guard_service__["a" /* AuthGuard */]],
        runGuardsAndResolvers: 'always',
        data: { breadcrumb: 'Главная' },
        children: [
            {
                path: '',
                component: __WEBPACK_IMPORTED_MODULE_5__home_dashboard_db_component__["a" /* DashboardComponent */],
                data: { breadcrumb: false, noBack: true },
                pathMatch: 'full'
            },
            {
                path: 'heroes',
                component: __WEBPACK_IMPORTED_MODULE_6__home_heroes_heroes_component__["a" /* HeroesComponent */],
                data: { breadcrumb: 'Heroes' },
                children: [
                    {
                        path: '',
                        component: __WEBPACK_IMPORTED_MODULE_7__home_heroes_list_list_component__["a" /* HeroesListComponent */],
                        data: { breadcrumb: false },
                        pathMatch: 'full'
                    },
                    {
                        path: 'create',
                        component: __WEBPACK_IMPORTED_MODULE_10__home_heroes_update_create_component__["a" /* HeroesCreateComponent */],
                        data: { breadcrumb: 'Create' },
                    },
                    {
                        path: ':id',
                        component: __WEBPACK_IMPORTED_MODULE_8__home_heroes_detail_detail_component__["a" /* HeroesDetailComponent */],
                        data: { breadcrumb: 'Detail' },
                        children: [
                            {
                                path: '',
                                component: __WEBPACK_IMPORTED_MODULE_9__home_heroes_view_view_component__["a" /* HeroesViewComponent */],
                                data: { breadcrumb: false },
                                pathMatch: 'full'
                            },
                            {
                                path: 'update',
                                component: __WEBPACK_IMPORTED_MODULE_11__home_heroes_update_update_component__["a" /* HeroesUpdateComponent */],
                                data: { breadcrumb: 'Update' },
                            }
                        ]
                    }
                ]
            },
            {
                path: 'message',
                component: __WEBPACK_IMPORTED_MODULE_12__home_message_message_component__["a" /* MessageComponent */],
                data: { breadcrumb: 'Сообщения' },
                children: [
                    {
                        path: '',
                        component: __WEBPACK_IMPORTED_MODULE_13__home_message_list_list_component__["a" /* MessageListComponent */],
                        data: { breadcrumb: false },
                        pathMatch: 'full'
                    },
                    {
                        path: ':id',
                        data: { breadcrumb: 'Message' },
                        component: __WEBPACK_IMPORTED_MODULE_14__home_message_detail_detail_component__["a" /* MessageDetailComponent */]
                    }
                ]
            },
            {
                path: '**',
                component: __WEBPACK_IMPORTED_MODULE_3__error_error_component__["a" /* ErrorComponent */],
                data: { code: 404, breadcrumb: 'Ошибка' }
            }
        ]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
var Config = (function () {
    function Config() {
    }
    Config.APP_NAME = 'CrowdProj';
    //    public static REST_ADDR = 'http://crowdproj.com';
    Config.REST_ADDR = '..';
    Config.REST_HERO = Config.REST_ADDR + '/api-heroes';
    Config.REST_LOGIN = Config.REST_ADDR + '/api-user';
    return Config;
}());



/***/ }),

/***/ "../../../../../src/app/error/error.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/error/error.component.html":
/***/ (function(module, exports) {

module.exports = "<h1>\n  {{title}}\n</h1>\n\n<p>{{error.code}}: {{error.message}}</p>\n\n<div>\n{{error.description}}\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/error/error.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_mock_errors__ = __webpack_require__("../../../../../src/app/models/mock-errors.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ErrorComponent = (function () {
    function ErrorComponent(route, titleService) {
        this.route = route;
        this.titleService = titleService;
        this.title = 'Error';
    }
    ErrorComponent.prototype.ngOnInit = function () {
        var code = this.route.snapshot.data['code'];
        this.error = __WEBPACK_IMPORTED_MODULE_2__models_mock_errors__["a" /* ERRORS */].find(function (error) { return error.code === code; });
        this.titleService.setTitle('Error: '.concat(code.toString()));
    };
    ErrorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-error',
            template: __webpack_require__("../../../../../src/app/error/error.component.html"),
            styles: [__webpack_require__("../../../../../src/app/error/error.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__services_title_service__["a" /* TitleService */]])
    ], ErrorComponent);
    return ErrorComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/dashboard/db.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "[class*='col-'] {\n//  float: left;\n  padding-right: 10px;\n  padding-bottom: 10px;\n}\n\n/*\n[class*='col-']:last-of-type {\n  padding-right: 5px;\n}\n*/\n\na {\n  text-decoration: none;\n}\n\n*, *:after, *:before {\n  box-sizing: border-box;\n}\n\nh3 {\n    text-align: center;\n    margin-bottom: 0;\n}\n\nh4 {\n    position: relative;\n}\n\n.grid {\n    margin: 0;\n}\n\n.col-1-4 {\n    width: 25%;\n    min-height: 60px;\n    min-width: 200px;\n    display: inline-block;\n    position: relative;\n}\n\n.module {\n    position: absolute;\n    text-align: center;\n    color: #eee;\n//    min-height: 60px;\n//    max-height: 120px;\n//    min-width: 190px;\n    left: 0px;\n    right: 0px;\n    top: 0px;\n    bottom: 0px;\n//    width: 100%;\n//    height: 100%;\n    background-color: #607D8B;\n    border-radius: 2px;\n}\n\n.module:hover {\n    background-color: #EEE;\n    cursor: pointer;\n    color: #607d8b;\n}\n\n.grid-pad {\n    padding: 5px 0;\n}\n.grid-pad > [class*='col-']:last-of-type {\n    padding-right: 5px;\n}\n\n/*\n@media (max-width: 600px) {\n    .module {\n//    font-size: 10px;\n//        max-height: 75px;\n        padding: 5px;\n    }\n}\n@media (max-width: 1024px) {\n    .grid {\n        margin: 0;\n    }\n    .module {\n        min-width: 60px;\n        padding: 20px;\n    }\n\n    .grid-pad {\n        padding: 10px 0;\n    }\n    .grid-pad > [class*='col-']:last-of-type {\n        padding-right: 20px;\n    }\n}\n*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/dashboard/db.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 i18n>Tour of Heroes</h1>\n\n<div class=\"grid grid-pad\">\n  <a *ngFor=\"let hero of heroes\"  [routerLink]=\"['/heroes', hero.id]\"  class=\"col-1-4\">\n    <div class=\"module hero\">\n      <h4>{{hero.name}}</h4>\n    </div>\n  </a>\n</div>"

/***/ }),

/***/ "../../../../../src/app/home/dashboard/db.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_hero_service__ = __webpack_require__("../../../../../src/app/services/hero.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardComponent = (function () {
    function DashboardComponent(heroService, titleService) {
        this.heroService = heroService;
        this.titleService = titleService;
        this.errorMessage = null;
        this.heroes = [];
        this.titleService.setTitle('');
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    DashboardComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService
            .getHeroes()
            .subscribe(function (heroes) { return _this.heroes = heroes.slice(1, 5); }, function (error) { return _this.errorMessage = error; });
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-dashboard',
            template: __webpack_require__("../../../../../src/app/home/dashboard/db.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/dashboard/db.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_hero_service__["a" /* HeroService */],
            __WEBPACK_IMPORTED_MODULE_2__services_title_service__["a" /* TitleService */]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/heroes/detail/detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/heroes/detail/detail.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/home/heroes/detail/detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroesDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_hero_service__ = __webpack_require__("../../../../../src/app/services/hero.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeroesDetailComponent = (function () {
    function HeroesDetailComponent(heroService, route) {
        this.heroService = heroService;
        this.route = route;
    }
    HeroesDetailComponent.prototype.ngOnInit = function () {
        /*
                this.routeSub = this.route.params
                    .switchMap((params: Params) => this.heroService.getHero(+params['id']))
                    .subscribe(hero => {
                        this.hero = hero;
                    });
        */
    };
    HeroesDetailComponent.prototype.ngOnDestroy = function () {
    };
    HeroesDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-heroes-detail',
            template: __webpack_require__("../../../../../src/app/home/heroes/detail/detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/heroes/detail/detail.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_hero_service__["a" /* HeroService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]])
    ], HeroesDetailComponent);
    return HeroesDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/heroes/heroes.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/heroes/heroes.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/home/heroes/heroes.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HeroesComponent = (function () {
    function HeroesComponent() {
    }
    HeroesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-heroes',
            template: __webpack_require__("../../../../../src/app/home/heroes/heroes.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/heroes/heroes.component.css")]
        })
    ], HeroesComponent);
    return HeroesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/heroes/list/list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".selected {\n  background-color: #CFD8DC !important;\n  color: white;\n}\n.heroes {\n  margin: 0 0 2em 0;\n  list-style-type: none;\n  padding: 0;\n  width: 15em;\n}\n.heroes li {\n  cursor: pointer;\n  position: relative;\n  left: 0;\n  background-color: #EEE;\n  margin: .5em;\n  padding: .3em 0;\n  height: 1.6em;\n  border-radius: 4px;\n}\n.heroes li:hover {\n  color: #607D8B;\n  background-color: #DDD;\n  left: .1em;\n}\n.heroes li.selected:hover {\n  background-color: #BBD8DC !important;\n  color: white;\n}\n.heroes .text {\n  position: relative;\n  top: -3px;\n}\n.heroes .badge {\n  display: inline-block;\n  font-size: small;\n  color: white;\n  padding: 0.8em 0.7em 0 0.7em;\n  background-color: #607D8B;\n  line-height: 1em;\n  position: relative;\n  left: -1px;\n  top: -4px;\n  height: 1.8em;\n  margin-right: .8em;\n  border-radius: 4px 0 0 4px;\n}\nbutton {\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  cursor: hand;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\n\nbutton.delete {\n  float:right;\n  margin-top: 2px;\n  margin-right: .8em;\n  background-color: gray !important;\n  color:white;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/heroes/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>My Heroes</h2>\n<ul class=\"heroes\" *ngIf=\"heroes\">\n    <li *ngFor=\"let hero of heroes\">\n        <span class=\"badge\">{{hero.id}}</span>\n        <a routerLink=\"./{{hero.id}}\">{{hero.name}}</a>\n        <button class=\"delete\" (click)=\"delete(hero); $event.stopPropagation()\">x</button>\n    </li>\n</ul>\n\n<a routerLink=\"./create\" class=\"btn\">Add a hero</a>\n"

/***/ }),

/***/ "../../../../../src/app/home/heroes/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroesListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_hero__ = __webpack_require__("../../../../../src/app/models/hero.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_hero_service__ = __webpack_require__("../../../../../src/app/services/hero.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HeroesListComponent = (function () {
    function HeroesListComponent(router, heroService, titleService) {
        this.router = router;
        this.heroService = heroService;
        this.titleService = titleService;
    }
    HeroesListComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('List of Heroes');
        this.getHeroes();
    };
    HeroesListComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService
            .getHeroes()
            .subscribe(function (heroes) { return _this.heroes = heroes; }, function (error) { return _this.errorMessage = error; });
    };
    HeroesListComponent.prototype.add = function (name) {
        var _this = this;
        var hero = new __WEBPACK_IMPORTED_MODULE_1__models_hero__["a" /* Hero */];
        hero.name = name;
        this.heroService
            .create(hero)
            .subscribe(function (hero) {
            _this.selectedHero = hero;
            _this.getHeroes();
            //                    this.gotoDetail();
        }, function (error) { return _this.errorMessage = error; });
    };
    HeroesListComponent.prototype.delete = function (hero) {
        var _this = this;
        this.heroService
            .delete(hero)
            .subscribe(function (result) {
            if (result) {
                if (_this.selectedHero.id === hero.id) {
                    _this.selectedHero = null;
                }
                _this.getHeroes();
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    HeroesListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-heroes-list',
            template: __webpack_require__("../../../../../src/app/home/heroes/list/list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/heroes/list/list.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__services_hero_service__["a" /* HeroService */],
            __WEBPACK_IMPORTED_MODULE_3__services_title_service__["a" /* TitleService */]])
    ], HeroesListComponent);
    return HeroesListComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/heroes/search/search.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".search-result{\n  border-bottom: 1px solid gray;\n  border-left: 1px solid gray;\n  border-right: 1px solid gray;\n  width:195px;\n  height: 16px;\n  padding: 5px;\n  background-color: white;\n  cursor: pointer;\n}\n.search-result:hover {\n  color: #eee;\n  background-color: #607D8B;\n}\n#search-box{\n  width: 200px;\n  height: 20px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/heroes/search/search.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"search-component\">\n  <h4>Hero Search</h4>\n  <input #searchBox id=\"search-box\" (keyup)=\"search(searchBox.value)\" />\n  <div>\n    <div *ngFor=\"let hero of heroes | async\"\n         (click)=\"gotoDetail(hero)\" class=\"search-result\" >\n      {{hero.name}}\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/home/heroes/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroesSearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_debounceTime__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_hero_service__ = __webpack_require__("../../../../../src/app/services/hero.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// Observable class extensions

// Observable operators




var HeroesSearchComponent = (function () {
    function HeroesSearchComponent(heroService, router) {
        this.heroService = heroService;
        this.router = router;
        this.searchTerms = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["b" /* Subject */]();
    }
    // Push a search term into the observable stream.
    HeroesSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    HeroesSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroes = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.heroService.search(term)
            : __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of([]); })
            .catch(function (error) {
            // TODO: add real error handling
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].of([]);
        });
    };
    HeroesSearchComponent.prototype.gotoDetail = function (hero) {
        var link = ['/detail', hero.id];
        this.router.navigate(link);
    };
    HeroesSearchComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-heroes-search',
            template: __webpack_require__("../../../../../src/app/home/heroes/search/search.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/heroes/search/search.component.css")],
            providers: [__WEBPACK_IMPORTED_MODULE_8__services_hero_service__["a" /* HeroService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__services_hero_service__["a" /* HeroService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], HeroesSearchComponent);
    return HeroesSearchComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/heroes/update/create.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroesCreateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_hero_service__ = __webpack_require__("../../../../../src/app/services/hero.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_hero__ = __webpack_require__("../../../../../src/app/models/hero.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Keep the Input import for now, you'll remove it later:









var HeroesCreateComponent = (function () {
    function HeroesCreateComponent(heroService, titleService, messageService, route, location) {
        this.heroService = heroService;
        this.titleService = titleService;
        this.messageService = messageService;
        this.route = route;
        this.location = location;
        this.hero = new __WEBPACK_IMPORTED_MODULE_8__models_hero__["a" /* Hero */];
        this.nameFormControl = new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_7__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_7__angular_forms__["e" /* Validators */].pattern(/^[a-zA-Zа-яА-Я- ]+$/)]);
    }
    HeroesCreateComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Create hero');
    };
    HeroesCreateComponent.prototype.ngOnDestroy = function () {
    };
    HeroesCreateComponent.prototype.onSubmit = function () {
        this.create();
    };
    HeroesCreateComponent.prototype.create = function () {
        var _this = this;
        this.heroService.create(this.hero).subscribe(function (result) { return _this.location.back(); }, function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8__models_hero__["a" /* Hero */])
    ], HeroesCreateComponent.prototype, "hero", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], HeroesCreateComponent.prototype, "nameFormControl", void 0);
    HeroesCreateComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-heroes-create',
            template: __webpack_require__("../../../../../src/app/home/heroes/update/update.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/heroes/update/update.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_hero_service__["a" /* HeroService */],
            __WEBPACK_IMPORTED_MODULE_4__services_title_service__["a" /* TitleService */],
            __WEBPACK_IMPORTED_MODULE_5__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]])
    ], HeroesCreateComponent);
    return HeroesCreateComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/heroes/update/update.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "label {\n  display: inline-block;\n  width: 3em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  margin-top: 20px;\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer; cursor: hand;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc; \n  cursor: auto;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/heroes/update/update.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <h1>Hero Form</h1>\n    <form (ngSubmit)=\"onSubmit()\" #heroForm=\"ngForm\" *ngIf=\"hero\">\n    <div class=\"form-group row\">\n      <label for=\"signupemail\" class=\"col-2 col-form-label\" i18n>E-mail</label>\n      <div class=\"col-10\">\n        <input\n            class=\"form-control\"\n            placeholder=\"Name\"\n            [(ngModel)]=\"hero.name\"\n            name=\"name\"\n            #heroname=\"ngModel\"\n            required\n            pattern=\"^[a-zA-Zа-яА-Я- ]+$\"\n        >\n        <small *ngIf=\"heroname.errors && (heroname.dirty || heroname.touched)\" class=\"form-text text-muted alert alert-danger\">\n            <div [hidden]=\"!heroname.errors.required\">Вы должны заполнить это поле</div>\n            <div [hidden]=\"!heroname.errors.pattern\">Имя должно содержать только буквы, знаки \"-\" и пробелы</div>\n        </small>\n      </div>\n    </div>\n\n      <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!heroForm.form.valid\">Submit</button>\n\n    </form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/home/heroes/update/update.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroesUpdateComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_hero_service__ = __webpack_require__("../../../../../src/app/services/hero.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_hero__ = __webpack_require__("../../../../../src/app/models/hero.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Keep the Input import for now, you'll remove it later:









var HeroesUpdateComponent = (function () {
    function HeroesUpdateComponent(heroService, titleService, messageService, route, location) {
        this.heroService = heroService;
        this.titleService = titleService;
        this.messageService = messageService;
        this.route = route;
        this.location = location;
        this.nameFormControl = new __WEBPACK_IMPORTED_MODULE_7__angular_forms__["a" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_7__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_7__angular_forms__["e" /* Validators */].pattern(/^[a-zA-Zа-яА-Я- ]+$/)]);
    }
    HeroesUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle('Update hero');
        this.routeSub = this.route.parent.params
            .switchMap(function (params) { return _this.heroService.getHero(+params['id']); })
            .subscribe(function (hero) {
            _this.hero = hero;
            _this.nameFormControl.setValue(hero.name);
            _this.titleService.setTitle(hero.name);
        });
    };
    HeroesUpdateComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
        //        this.heroSub.unsubscribe();
    };
    HeroesUpdateComponent.prototype.onSubmit = function () {
        //    this.submitted = true;
        this.save();
    };
    HeroesUpdateComponent.prototype.save = function () {
        var _this = this;
        this.heroService.update(this.hero).subscribe(function (result) { return _this.location.back(); }, function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8__models_hero__["a" /* Hero */])
    ], HeroesUpdateComponent.prototype, "hero", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Object)
    ], HeroesUpdateComponent.prototype, "nameFormControl", void 0);
    HeroesUpdateComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-heroes-update',
            template: __webpack_require__("../../../../../src/app/home/heroes/update/update.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/heroes/update/update.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_hero_service__["a" /* HeroService */],
            __WEBPACK_IMPORTED_MODULE_4__services_title_service__["a" /* TitleService */],
            __WEBPACK_IMPORTED_MODULE_5__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]])
    ], HeroesUpdateComponent);
    return HeroesUpdateComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/heroes/view/view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "label {\n  display: inline-block;\n  width: 3em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  margin-top: 20px;\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer; cursor: hand;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc; \n  cursor: auto;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/heroes/view/view.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"hero\">\n    <h2>{{hero.name}} details!</h2>\n    <div><label>id: </label>{{hero.id}}</div>\n    <div>\n        <label>name: </label>\n        <span>{{hero.name}}</span>\n    </div>\n</div>\n\n<a routerLink=\"./update\" class=\"btn\">Update</a>\n"

/***/ }),

/***/ "../../../../../src/app/home/heroes/view/view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroesViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_hero_service__ = __webpack_require__("../../../../../src/app/services/hero.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_hero__ = __webpack_require__("../../../../../src/app/models/hero.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Keep the Input import for now, you'll remove it later:







var HeroesViewComponent = (function () {
    function HeroesViewComponent(heroService, titleService, messageService, route) {
        this.heroService = heroService;
        this.titleService = titleService;
        this.messageService = messageService;
        this.route = route;
    }
    HeroesViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle('Hero Detail');
        this.routeSub = this.route.parent.params
            .switchMap(function (params) { return _this.heroService.getHero(+params['id']); })
            .subscribe(function (hero) {
            _this.hero = hero;
            _this.route.parent.data['breadcrumb'] = hero.name;
            _this.titleService.setTitle(hero.name);
        });
    };
    HeroesViewComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6__models_hero__["a" /* Hero */])
    ], HeroesViewComponent.prototype, "hero", void 0);
    HeroesViewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-heroes-view',
            template: __webpack_require__("../../../../../src/app/home/heroes/view/view.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/heroes/view/view.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_hero_service__["a" /* HeroService */],
            __WEBPACK_IMPORTED_MODULE_3__services_title_service__["a" /* TitleService */],
            __WEBPACK_IMPORTED_MODULE_4__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]])
    ], HeroesViewComponent);
    return HeroesViewComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
        })
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/message/detail/detail.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "label {\n  display: inline-block;\n  width: 3em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  margin-top: 20px;\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer; cursor: hand;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc; \n  cursor: auto;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/message/detail/detail.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message\">\n    <h2>{{message.title}} details!</h2>\n    <div><label>id: </label>{{message.id}}</div>\n    <div>\n        <label>message: </label>\n        <div>{{message.title}}</div>\n    </div>\n    <div>\n        <label>text: </label>\n        <div>{{message.text}}</div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/home/message/detail/detail.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageDetailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_message__ = __webpack_require__("../../../../../src/app/models/message.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Keep the Input import for now, you'll remove it later:







var MessageDetailComponent = (function () {
    function MessageDetailComponent(titleService, messageService, route, router) {
        this.titleService = titleService;
        this.messageService = messageService;
        this.route = route;
        this.router = router;
    }
    MessageDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.titleService.setTitle('Message Detail');
        this.routeSub = this.route.params
            .subscribe(function (params) {
            var message = _this.messageService.getMessage(+params['id']);
            if (message === null || message === undefined) {
                _this.router.navigate(['/error', 404]);
            }
            else {
                _this.message = message;
            }
        });
        /*
                    .switchMap((params: Params) => this.heroService.getHero(+params['id']))
                    .subscribe(hero => {
                        this.hero = hero;
                        this.titleService.setTitle(hero.name);
                    });
        */
    };
    MessageDetailComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__models_message__["a" /* Message */])
    ], MessageDetailComponent.prototype, "message", void 0);
    MessageDetailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-message-detail',
            template: __webpack_require__("../../../../../src/app/home/message/detail/detail.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/message/detail/detail.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_title_service__["a" /* TitleService */],
            __WEBPACK_IMPORTED_MODULE_3__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], MessageDetailComponent);
    return MessageDetailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/message/dialog/dialog.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/message/dialog/dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\" i18n>Messages</h4>\n    <button type=\"button\" class=\"close\" i18n-aria-label aria-label=\"Close\" (click)=\"d('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n\n    <a routerLink=\"/message\" i18n=\"all messages\">All</a>\n    <ul class=\"messages\" *ngIf=\"messageService.messages\">\n        <li *ngFor=\"let message of messageService.messages\">\n            <span class=\"badge\">{{message.id}}</span>\n            <a routerLink=\"/message/{{message.id}}\">{{message.title}}</a>\n            <button class=\"delete\" (click)=\"delete(message.id); $event.stopPropagation()\">x</button>\n        </li>\n    </ul>\n\n\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\" i18n>Close</button>\n  </div>\n</ng-template>\n\n<!-- button class=\"btn btn-lg btn-outline-primary\" (click)=\"open(content)\">Launch demo modal</button -->\n\n<!--h2 md-dialog-title>Dialog</h2-->\n<!-- md-dialog-content (click)=\"dialogRef.close()\">\n    <a routerLink=\"/message\">Все</a>\n    <ul class=\"messages\" *ngIf=\"messages\">\n        <li *ngFor=\"let message of messages\">\n            <span class=\"badge\">{{message.id}}</span>\n            <a routerLink=\"/message/{{message.id}}\">{{message.title}}</a>\n            <button class=\"delete\" (click)=\"delete(message.id); $event.stopPropagation()\">x</button>\n        </li>\n    </ul>\n</md-dialog-content>\n<md-dialog-actions>\n    <button md-button md-dialog-close=\"Закрыть\">Закрыть</button>\n</md-dialog-actions -->\n"

/***/ }),

/***/ "../../../../../src/app/home/message/dialog/dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


//import { MessageComponent } from '../message.component';
var MessageDialogComponent = (function () {
    function MessageDialogComponent(
        //        @Inject(MD_DIALOG_DATA) public data: any,
        //        public dialogRef: MdDialogRef<MessageDialogComponent>
        messageService, modalService) {
        this.messageService = messageService;
        this.modalService = modalService;
        this.messages = [];
    }
    MessageDialogComponent.prototype.open = function (content) {
        this.modalService.open(content).result.then(function (result) {
            // this.closeResult = `Closed with: ${result}`;
        }, function (reason) {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    };
    MessageDialogComponent.prototype.getDismissReason = function (reason) {
        if (reason === __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].ESC) {
            return 'by pressing ESC';
        }
        else if (reason === __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["a" /* ModalDismissReasons */].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    MessageDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-message-dialog',
            template: __webpack_require__("../../../../../src/app/home/message/dialog/dialog.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/message/dialog/dialog.component.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]])
    ], MessageDialogComponent);
    return MessageDialogComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/message/icon/icon.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".message-icon {\n    position: relative;\n    border-radius: 12%;\n}\n\n.stack {\n    position: absolute;\n    width: 100%;\n    height: 14px;\n    line-height: 14px;\n    font-size: 10px;\n    left: 0;\n    top: 4px;\n}\n\n.error {\n    background-color: red;\n    border: solid 1px red;\n}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/message/icon/icon.component.html":
/***/ (function(module, exports) {

module.exports = "<button md-icon-button (click)=\"openMessagesDialog(content)\" *ngIf=\"messageCount > 0\">\n    <!--md-icon class=\"md-24 message-icon {{messageClass}}\">\n        chat_bubble_outline\n        <span class=\"stack\">{{messageCount}}</span>\n    </md-icon-->\n        <span class=\"stack\">{{messageCount}}</span>\n</button>\n"

/***/ }),

/***/ "../../../../../src/app/home/message/icon/icon.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageIconComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_message__ = __webpack_require__("../../../../../src/app/models/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { MdDialog, MdDialogRef } from '@angular/material';



var MessageIconComponent = (function () {
    function MessageIconComponent(messageService, 
        //        public dialog: MdDialog
        modalService) {
        this.messageService = messageService;
        this.modalService = modalService;
        this.modalOpen = false;
        this.messageClass = '';
        this.messageCount = 0;
        this.messages = [];
    }
    MessageIconComponent.prototype.openMessagesDialog = function (content) {
        /*
        let dialogRef = this.dialog.open(MessageDialogComponent, {
        //    height: '400px',
        //    width: '600px',
            data: {
                messages: this.messages
            }
        });
        */
        this.modalService.open(content).result.then(function (result) {
            // this.closeResult = `Closed with: ${result}`;
        }, function (reason) {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    };
    MessageIconComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.messageService
            .getMessages()
            .subscribe(function (messages) { return _this.receiveMessages(messages); });
    };
    MessageIconComponent.prototype.receiveMessages = function (messages) {
        console.log('message component receiveMessage');
        console.log(this.messages.length);
        this.messages = messages;
        var messageType = messages.reduce(function (prevType, message) {
            if (message.type === __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_ERROR || prevType === __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_ERROR) {
                return __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_ERROR;
            }
            else if (message.type === __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_ALERT || prevType === __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_ALERT) {
                return __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_ALERT;
            }
            else if (message.type === __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_WARNING || prevType === __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_WARNING) {
                return __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_WARNING;
            }
            else if (message.type === __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_INFO || prevType === __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_INFO) {
                return __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_INFO;
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_DEBUG;
            }
        }, __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].MESSAGE_TYPE_DEBUG);
        this.messageCount = messages.filter(function (message) { return message.type === messageType; }).length;
        this.messageClass = __WEBPACK_IMPORTED_MODULE_2__models_message__["a" /* Message */].messageTypesMap[messageType];
    };
    MessageIconComponent.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    };
    MessageIconComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-message-icon',
            template: __webpack_require__("../../../../../src/app/home/message/icon/icon.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/message/icon/icon.component.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]])
    ], MessageIconComponent);
    return MessageIconComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/message/list/list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".selected {\n  background-color: #CFD8DC !important;\n  color: white;\n}\n.heroes {\n  margin: 0 0 2em 0;\n  list-style-type: none;\n  padding: 0;\n  width: 15em;\n}\n.heroes li {\n  cursor: pointer;\n  position: relative;\n  left: 0;\n  background-color: #EEE;\n  margin: .5em;\n  padding: .3em 0;\n  height: 1.6em;\n  border-radius: 4px;\n}\n.heroes li:hover {\n  color: #607D8B;\n  background-color: #DDD;\n  left: .1em;\n}\n.heroes li.selected:hover {\n  background-color: #BBD8DC !important;\n  color: white;\n}\n.heroes .text {\n  position: relative;\n  top: -3px;\n}\n.heroes .badge {\n  display: inline-block;\n  font-size: small;\n  color: white;\n  padding: 0.8em 0.7em 0 0.7em;\n  background-color: #607D8B;\n  line-height: 1em;\n  position: relative;\n  left: -1px;\n  top: -4px;\n  height: 1.8em;\n  margin-right: .8em;\n  border-radius: 4px 0 0 4px;\n}\nbutton {\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  cursor: hand;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\n\nbutton.delete {\n  float:right;\n  margin-top: 2px;\n  margin-right: .8em;\n  background-color: gray !important;\n  color:white;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/message/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<!--h1>\n  {{title}}\n</h1-->\n\n<h2>Messages</h2>\n<ul class=\"mssages\" *ngIf=\"messageService.messages\">\n    <li *ngFor=\"let message of messageService.messages\">\n        <span class=\"badge\">{{message.id}}</span>\n        <a routerLink=\"/message/{{message.id}}\">{{message.title}}</a>\n        <button class=\"delete\" (click)=\"delete(message); $event.stopPropagation()\">x</button>\n        <div>{{message.text}}</div>\n    </li>\n</ul>\n"

/***/ }),

/***/ "../../../../../src/app/home/message/list/list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MessageListComponent = (function () {
    function MessageListComponent(router, messageService, titleService) {
        this.router = router;
        this.messageService = messageService;
        this.titleService = titleService;
    }
    MessageListComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('List of Messages');
    };
    MessageListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-heroes-list',
            template: __webpack_require__("../../../../../src/app/home/message/list/list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/message/list/list.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_2__services_title_service__["a" /* TitleService */]])
    ], MessageListComponent);
    return MessageListComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/message/message.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/message/message.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/home/message/message.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MessageComponent = (function () {
    function MessageComponent() {
    }
    MessageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-message',
            template: __webpack_require__("../../../../../src/app/home/message/message.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/message/message.component.css")]
        })
    ], MessageComponent);
    return MessageComponent;
}());



/***/ }),

/***/ "../../../../../src/app/models/hero.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Hero; });
var Hero = (function () {
    function Hero() {
    }
    return Hero;
}());



/***/ }),

/***/ "../../../../../src/app/models/message.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
var Message = (function () {
    function Message() {
    }
    Message.MESSAGE_TYPE_INFO = 1;
    Message.MESSAGE_TYPE_WARNING = 2;
    Message.MESSAGE_TYPE_ERROR = 3;
    Message.MESSAGE_TYPE_ALERT = 4;
    Message.MESSAGE_TYPE_DEBUG = 10;
    Message.messageTypesMap = (_a = {},
        _a[Message.MESSAGE_TYPE_ERROR] = 'error',
        _a[Message.MESSAGE_TYPE_ALERT] = 'alert',
        _a[Message.MESSAGE_TYPE_WARNING] = 'warning',
        _a[Message.MESSAGE_TYPE_INFO] = '',
        _a[Message.MESSAGE_TYPE_DEBUG] = '',
        _a);
    return Message;
}());

var _a;


/***/ }),

/***/ "../../../../../src/app/models/mock-errors.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ERRORS; });
var ERRORS = [
    { code: 404, message: 'Page not found', description: 'You either click an old link or type a wrong address' },
];


/***/ }),

/***/ "../../../../../src/app/modules/user/models/login.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
var Login = (function () {
    function Login() {
    }
    return Login;
}());



/***/ }),

/***/ "../../../../../src/app/modules/user/models/signup.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Signup; });
var Signup = (function () {
    function Signup() {
    }
    return Signup;
}());



/***/ }),

/***/ "../../../../../src/app/modules/user/models/user.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User() {
    }
    User.prototype.getName = function () {
        var names = [];
        if (this.fname)
            names.push(this.fname);
        if (this.mname)
            names.push(this.mname);
        if (this.lname)
            names.push(this.lname);
        var nameStr = names.join(" ");
        return nameStr ? nameStr : this.email;
    };
    User.prototype.import = function (dat) {
        if (typeof dat == "string") {
            dat = JSON.parse(dat);
        }
        if (dat['id'])
            this.id = dat['id'];
        if (dat['email'])
            this.email = dat['email'];
        if (dat['status_id'])
            this.status_id = dat['status_id'];
        if (dat['type_id'])
            this.type_id = dat['type_id'];
        if (dat['fname'])
            this.fname = dat['fname'];
        if (dat['mname'])
            this.mname = dat['mname'];
        if (dat['lname'])
            this.lname = dat['lname'];
        if (dat['bdate'])
            this.bdate = dat['bdate'];
        return this;
    };
    User.prototype.export = function () {
        return JSON.stringify({
            id: this.id,
            email: this.email,
            status_id: this.status_id,
            type_id: this.type_id,
            fname: this.fname,
            mname: this.mname,
            lname: this.lname,
            bdate: this.bdate
        });
    };
    return User;
}());



/***/ }),

/***/ "../../../../../src/app/modules/user/profile/profile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/user/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 i18n>Profile</h2>\n\n"

/***/ }),

/***/ "../../../../../src/app/modules/user/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_component__ = __webpack_require__("../../../../../src/app/modules/user/user.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

//import { AuthService } from '../../../services/auth.service';
//import { TitleService } from '../../../services/title.service';
//import { MessageService } from '../../../services/message.service';

var UserProfileComponent = (function (_super) {
    __extends(UserProfileComponent, _super);
    function UserProfileComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRequesting = false;
        return _this;
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Profile');
    };
    UserProfileComponent.prototype.ngOnDestroy = function () {
    };
    UserProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-user-profile',
            template: __webpack_require__("../../../../../src/app/modules/user/profile/profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/user/profile/profile.component.css")]
        })
    ], UserProfileComponent);
    return UserProfileComponent;
}(__WEBPACK_IMPORTED_MODULE_1__user_component__["a" /* UserComponent */]));



/***/ }),

/***/ "../../../../../src/app/modules/user/services/auth-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("../../../../../src/app/modules/user/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        return this.checkLogin(url);
    };
    AuthGuard.prototype.checkLogin = function (url) {
        if (this.authService.isLoggedIn) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['/user/signin']);
        return false;
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "../../../../../src/app/modules/user/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_user__ = __webpack_require__("../../../../../src/app/modules/user/models/user.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_message__ = __webpack_require__("../../../../../src/app/models/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config__ = __webpack_require__("../../../../../src/app/config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AuthService = (function () {
    function AuthService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.isLoggedIn = false;
        this.prefixUrl = __WEBPACK_IMPORTED_MODULE_9__config__["a" /* Config */].REST_LOGIN; // URL to web API
    }
    AuthService.prototype.check = function () {
        var _this = this;
        var url = this.prefixUrl + "/check";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .post(url, {}, { headers: headers })
            .map(function (result) { return _this.extractData(result); })
            .catch(function (error) { return _this.handleError(error); });
    };
    AuthService.prototype.signup = function (signup) {
        var _this = this;
        //        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
        var url = this.prefixUrl + "/signup";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .post(url, JSON.stringify(signup), { headers: headers })
            .map(function (result) {
            var reply = result.json();
            return reply;
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    AuthService.prototype.login = function (login) {
        var _this = this;
        //        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
        var url = this.prefixUrl + "/login";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .post(url, JSON.stringify(login), { headers: headers })
            .map(function (result) { return _this.extractData(result); })
            .catch(function (error) { return _this.handleError(error); });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        var url = this.prefixUrl + "/logout";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .post(url, {}, { headers: headers })
            .map(function (result) { return _this.extractData(result); })
            .catch(function (error) { return _this.handleError(error); });
    };
    AuthService.prototype.extractData = function (res) {
        var body = res.json();
        if (body['logged'] == 'in') {
            this.isLoggedIn = true;
        }
        else if (body['logged'] == 'out') {
            this.isLoggedIn = false;
        }
        if (body['user']) {
            this.user = (new __WEBPACK_IMPORTED_MODULE_6__models_user__["a" /* User */]).import(body['user']);
        }
        if (body['result'] == 'success') {
            return; //body[field];
        }
        return body || null;
    };
    AuthService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Response */]) {
            var err = void 0;
            try {
                var body = error.json();
                err = body.error || JSON.stringify(body);
            }
            catch (e) {
                err = '';
            }
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.messageService.sendMessage({
            type: __WEBPACK_IMPORTED_MODULE_7__models_message__["a" /* Message */].MESSAGE_TYPE_ERROR,
            title: 'Server connection error',
            text: errMsg,
        });
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].throw(errMsg);
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_8__services_message_service__["a" /* MessageService */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "../../../../../src/app/modules/user/services/ws.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stomp_ng2_stompjs__ = __webpack_require__("../../../../@stomp/ng2-stompjs/@stomp/ng2-stompjs.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { Http, Response, Headers, RequestOptions } from '@angular/http';




var WsService = (function () {
    function WsService(stompService
        //        private messageService: MessageService
    ) {
        this.stompService = stompService;
        this.isLoggedIn = false;
        //        this.user = (new User).import(localStorage.getItem('user'));
        //        this.jwt = JSON.parse(localStorage.getItem('jwt'));
        this.token = this.jwt && this.jwt.token;
        this.subscription = this.stompService.subscribe('/auth/states').map(function (message) {
            return message.body;
        }).subscribe(function (msg_body) {
            console.log("Received: " + msg_body);
        });
    }
    WsService.prototype.check = function () {
        this.stompService.publish('/auth/signin', 'My important message');
        return this.subscription;
    };
    WsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__stomp_ng2_stompjs__["b" /* StompService */]
            //        private messageService: MessageService
        ])
    ], WsService);
    return WsService;
}());



/***/ }),

/***/ "../../../../../src/app/modules/user/signin/signin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".card-container.card {\n    max-width: 350px;\n    padding: 40px 40px;\n}\n\n/*\n * Card component\n */\n.card {\n    background-color: #F7F7F7;\n    /* just in case there no content*/\n    padding: 20px 25px 30px;\n    margin: 0 auto 25px;\n    margin-top: 50px;\n    /* shadows and rounded borders */\n    border-radius: 2px;\n    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);\n}\n\n.profile-img-card {\n    width: 96px;\n    height: 96px;\n    margin: 0 auto 10px;\n    display: block;\n    border-radius: 50%;\n}\n\n.btn.btn-signin {\n    /*background-color: #4d90fe; */\n    background-color: rgb(104, 145, 162);\n    /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/\n    padding: 0px;\n    font-weight: 700;\n    font-size: 14px;\n    height: 36px;\n    border-radius: 3px;\n    border: none;\n    transition: all 0.218s;\n}\n\n.btn.btn-signin:hover,\n.btn.btn-signin:active,\n.btn.btn-signin:focus {\n    background-color: rgb(12, 97, 33);\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/user/signin/signin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-container\">\n\n    <img id=\"profile-img\"\n        class=\"profile-img-card\"\n        src=\"assets/img/profile.png\"\n    />\n    <p i18n=\"@@signin-request-message\" *ngIf=\"isRequesting\">Trying to sign in</p>\n\n<form (ngSubmit)=\"login()\" #loginForm=\"ngForm\">\n    <div class=\"form-group row\">\n      <!--label for=\"loginemail\" class=\"col-2 col-form-label\" i18n>E-mail</label-->\n      <div class=\"col\">\n        <input\n            class=\"form-control\"\n            type=\"email\"\n            i18n-placeholder\n            placeholder=\"E-mail\"\n            [(ngModel)]=\"loginDat.email\"\n            name=\"email\"\n            #loginlogin=\"ngModel\"\n            required\n            pattern=\"^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*))@((([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$\"\n        >\n        <small *ngIf=\"loginlogin.errors && (loginlogin.dirty || loginlogin.touched)\" class=\"form-text text-muted alert alert-danger\">\n            <div [hidden]=\"!loginlogin.errors.required\" i18n=\"@@email-valid-empty\">E-mail cannot be empty</div>\n            <div [hidden]=\"!loginlogin.errors.pattern\" i18n=\"@@email-valid-pattern\">E-mail must look like your_name@example.com</div>\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <!--label for=\"loginpassword\" class=\"col-2 col-form-label\" i18n>Password</label-->\n      <div class=\"col\">\n        <input\n            class=\"form-control\"\n            type=\"password\"\n            i18n-placeholder\n            placeholder=\"Password\"\n            [(ngModel)]=\"loginDat.password\"\n            name=\"password\"\n            #loginpassword=\"ngModel\"\n            required\n            pattern=\"^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\\d).{6,}$\"\n        >\n        <small *ngIf=\"loginpassword.errors && (loginpassword.dirty || loginpassword.touched)\" class=\"form-text text-muted alert alert-danger\">\n            <div [hidden]=\"!loginpassword.errors.required\" i18n=\"@@password-valid-empty\">You must type in password</div>\n            <div [hidden]=\"!loginpassword.errors.pattern\" i18n=\"@@password-valid-pattern\">Password must contain both capital and lowercase letters as well as digits with the size no less then 6 symbols</div>\n        </small>\n      </div>\n    </div>\n    <button type=\"submit\" class=\"btn btn-lg btn-primary btn-block btn-signin\" [disabled]=\"!loginForm.form.valid\" i18n>Sign in</button>\n</form>\n</div>"

/***/ }),

/***/ "../../../../../src/app/modules/user/signin/signin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSigninComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_login__ = __webpack_require__("../../../../../src/app/modules/user/models/login.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_component__ = __webpack_require__("../../../../../src/app/modules/user/user.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

/*
import { Router }      from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Signup }      from '../models/signup';
import { TitleService } from '../../../services/title.service';
import { MessageService } from '../../../services/message.service';
import { Subscription } from 'rxjs/Subscription';
*/

var UserSigninComponent = (function (_super) {
    __extends(UserSigninComponent, _super);
    function UserSigninComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loginDat = { email: "", password: "" };
        _this.isRequesting = false;
        _this.emailRegex = "^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$";
        return _this;
    }
    //emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    UserSigninComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Sign in');
    };
    UserSigninComponent.prototype.ngAfterViewInit = function () {
    };
    UserSigninComponent.prototype.ngOnDestroy = function () {
        //        this.routeSub.unsubscribe();
    };
    UserSigninComponent.prototype.login = function () {
        var _this = this;
        this.isRequesting = true;
        this.authService.login(this.loginDat).subscribe(function () {
            _this.isRequesting = false;
            if (_this.authService.isLoggedIn) {
                var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '/';
                _this.router.navigate([redirect]);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_login__["a" /* Login */])
    ], UserSigninComponent.prototype, "loginDat", void 0);
    UserSigninComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-user-signin',
            template: __webpack_require__("../../../../../src/app/modules/user/signin/signin.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/user/signin/signin.component.css")]
        })
    ], UserSigninComponent);
    return UserSigninComponent;
}(__WEBPACK_IMPORTED_MODULE_2__user_component__["a" /* UserComponent */]));



/***/ }),

/***/ "../../../../../src/app/modules/user/signout/signout.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input {\n    width: 100%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/user/signout/signout.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 i18n=\"@@signout-farewell\">We are looking forward you back!</h2>\n\n<p i18n=\"@@signout-request-message\" *ngIf=\"isRequesting\">Trying to sign out</p>\n"

/***/ }),

/***/ "../../../../../src/app/modules/user/signout/signout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSignoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_component__ = __webpack_require__("../../../../../src/app/modules/user/user.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var UserSignoutComponent = (function (_super) {
    __extends(UserSignoutComponent, _super);
    function UserSignoutComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRequesting = false;
        return _this;
    }
    UserSignoutComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Sign out');
        this.signout();
    };
    UserSignoutComponent.prototype.ngOnDestroy = function () {
    };
    UserSignoutComponent.prototype.signout = function () {
        var _this = this;
        this.isRequesting = true;
        this.authService.logout().subscribe(function () {
            _this.isRequesting = false;
            if (!_this.authService.isLoggedIn) {
                _this.router.navigate(['/']);
            }
        });
    };
    UserSignoutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-user-signout',
            template: __webpack_require__("../../../../../src/app/modules/user/signout/signout.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/user/signout/signout.component.css")]
        })
    ], UserSignoutComponent);
    return UserSignoutComponent;
}(__WEBPACK_IMPORTED_MODULE_1__user_component__["a" /* UserComponent */]));



/***/ }),

/***/ "../../../../../src/app/modules/user/signup/signup.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input {\n    width: 100%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/user/signup/signup.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-container\">\n<p i18n=\"@@signup-request-message\" *ngIf=\"isRequesting\">Trying to sign up</p>\n\n<div class=\"signup-success\" *ngIf=\"isRegistered\">\n    <div i18n=\"@@signup-success-message\">\n\n    <p>Congratulations! You have been successfully signed up at the CrowdProj portal.</p>\n\n    <p>Please check your email: <b>{{signupDat.email}}</b> for further\n    instructions. You should confirm your email address within 24 hours.\n    After that your profile will be available for use.</p>\n\n    </div>\n\n    <button class=\"btn btn-success\" i18n=\"@@got-it\" (click)=\"gotIt()\">Got it!</button>\n</div>\n\n<form (ngSubmit)=\"signup()\" #signupForm=\"ngForm\" *ngIf=\"!isRegistered\">\n    <div class=\"form-group row\">\n      <label for=\"signupemail\" class=\"col-2 col-form-label\" i18n>E-mail</label>\n      <div class=\"col-10\">\n        <input\n            class=\"form-control\"\n            type=\"email\"\n            i18n-placeholder\n            placeholder=\"E-mail\"\n            [(ngModel)]=\"signupDat.email\"\n            name=\"email\"\n            #signupEmail=\"ngModel\"\n            required\n            pattern=\"^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*))@((([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$\"\n        >\n        <small *ngIf=\"signupEmail.errors && (signupEmail.dirty || signupEmail.touched)\" class=\"form-text text-muted alert alert-danger\">\n            <div [hidden]=\"!signupEmail.errors.required\" i18n=\"@@email-valid-empty\">E-mail cannot be empty</div>\n            <div [hidden]=\"!signupEmail.errors.pattern\" i18n=\"@@email-valid-pattern\">E-mail must look like your_name@example.com</div>\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <label for=\"signupFname\" class=\"col-2 col-form-label\" i18n=\"@@first-name\">First Name</label>\n      <div class=\"col-10\">\n        <input\n            class=\"form-control\"\n            type=\"text\"\n            i18n-placeholder=\"@@first-name\"\n            placeholder=\"First Name\"\n            [(ngModel)]=\"signupDat.fname\"\n            name=\"fname\"\n            #signupFname=\"ngModel\"\n            required\n            pattern=\"^\\w+$\"\n        >\n        <small *ngIf=\"signupFname.errors && (signupFname.dirty || signupFname.touched)\" class=\"form-text text-muted alert alert-danger\">\n            <div [hidden]=\"!signupFname.errors.required\" i18n=\"@@fname-valid-empty\">Fill in your first name</div>\n            <div [hidden]=\"!signupFname.errors.pattern\" i18n=\"@@fname-valid-pattern\">Name must contain only letters</div>\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <label for=\"signupMname\" class=\"col-2 col-form-label\" i18n=\"@@middle-name\">Middle Name</label>\n      <div class=\"col-10\">\n        <input\n            class=\"form-control\"\n            type=\"text\"\n            i18n-placeholder=\"@@middle-name\"\n            placeholder=\"Отчество\"\n            [(ngModel)]=\"signupDat.mname\"\n            name=\"mname\"\n            #signupMname=\"ngModel\"\n            pattern=\"^\\w+$\"\n        >\n        <small *ngIf=\"signupMname.errors && (signupMname.dirty || signupMname.touched)\" class=\"form-text text-muted alert alert-danger\">\n            <div [hidden]=\"!signupMname.errors.pattern\" i18n=\"@@mname-valid-pattern\">Middle name must contain only letters</div>\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <label for=\"signupLname\" class=\"col-2 col-form-label\" i18n=\"@@last-name\">Last Name</label>\n      <div class=\"col-10\">\n        <input\n            class=\"form-control\"\n            type=\"text\"\n            i18n-placeholder=\"@@last-name\"\n            placeholder=\"Last Name\"\n            [(ngModel)]=\"signupDat.lname\"\n            name=\"lname\"\n            #signupLname=\"ngModel\"\n            required\n            pattern=\"^\\w+$\"\n        >\n\n        <small *ngIf=\"signupLname.errors && (signupLname.dirty || signupLname.touched)\" class=\"form-text text-muted alert alert-danger\">\n            <div [hidden]=\"!signupLname.errors.required\" i18n=\"@@mname-valid-empty\">Fill in your family name</div>\n            <div [hidden]=\"!signupLname.errors.pattern\" i18n=\"@@mname-valid-pattern\">Last name must contain only letters</div>\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <label for=\"signupPassword\" class=\"col-2 col-form-label\" i18n>Password</label>\n      <div class=\"col-10\">\n        <input\n            class=\"form-control\"\n            type=\"password\"\n            i18n-placeholder\n            placeholder=\"Password\"\n            [(ngModel)]=\"signupDat.password\"\n            name=\"password\"\n            #signupPassword=\"ngModel\"\n            required\n            pattern=\"^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\\d).{6,}$\"\n        >\n        <small *ngIf=\"signupPassword.errors && (signupPassword.dirty || signupPassword.touched)\" class=\"form-text text-muted alert alert-danger\">\n            <div [hidden]=\"!signupPassword.errors.required\" i18n=\"@@password-valid-empty\">You must type in password</div>\n            <div [hidden]=\"!signupPassword.errors.pattern\" i18n=\"@@password-valid-pattern\">Password must contain both capital and lowercase letters as well as digits with the size no less then 6 symbols</div>\n        </small>\n      </div>\n    </div>\n\n    <div class=\"form-group row\">\n      <label for=\"signupPassword1\" class=\"col-2 col-form-label\" i18n=\"@@password-repeat\">Verify Password</label>\n      <div class=\"col-10\">\n        <input\n            class=\"form-control\"\n            type=\"password\"\n            i18n-placeholder=\"@@password-repeat\"\n            placeholder=\"Verify Password\"\n            [(ngModel)]=\"signupDat.password1\"\n            name=\"password1\"\n            #signupPassword1=\"ngModel\"\n            required\n            pattern=\"^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\\d).{6,}$\"\n        >\n\n        <small *ngIf=\"signupPassword1.errors && (signupPassword1.dirty || signupPassword1.touched)\" class=\"form-text text-muted alert alert-danger\">\n            <div [hidden]=\"!signupPassword1.errors.required\" i18n=\"@@password1-valid-empty\">Type password once again</div>\n            <div [hidden]=\"!signupPassword1.errors.pattern\" i18n=\"@@password-valid-pattern\">Password must contain both capital and lowercase letters as well as digits with the size no less then 6 symbols</div>\n            <div [hidden]=\"!signupPassword1.errors.pattern\" i18n=\"@@password1-valid-differs\">Passwords differ</div>\n        </small>\n      </div>\n    </div>\n    <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!signupForm.form.valid\" i18n>Sign up</button>\n</form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/modules/user/signup/signup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSignupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_signup__ = __webpack_require__("../../../../../src/app/modules/user/models/signup.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_component__ = __webpack_require__("../../../../../src/app/modules/user/user.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserSignupComponent = (function (_super) {
    __extends(UserSignupComponent, _super);
    function UserSignupComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.signupDat = { email: "", password: "", password1: "", fname: "", lname: "", mname: "" };
        _this.isRequesting = false;
        _this.isRegistered = false;
        return _this;
    }
    UserSignupComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle('Sign up');
    };
    UserSignupComponent.prototype.ngOnDestroy = function () {
    };
    UserSignupComponent.prototype.signup = function () {
        var _this = this;
        this.isRequesting = true;
        this.authService.signup(this.signupDat).subscribe(function (reply) {
            _this.isRequesting = false;
            if (reply.result == 'success') {
                _this.isRegistered = true;
            }
        });
    };
    UserSignupComponent.prototype.gotIt = function () {
        this.router.navigate(["/user/signin"]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_signup__["a" /* Signup */])
    ], UserSignupComponent.prototype, "signupDat", void 0);
    UserSignupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-user-signup',
            template: __webpack_require__("../../../../../src/app/modules/user/signup/signup.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/user/signup/signup.component.css")]
        })
    ], UserSignupComponent);
    return UserSignupComponent;
}(__WEBPACK_IMPORTED_MODULE_2__user_component__["a" /* UserComponent */]));



/***/ }),

/***/ "../../../../../src/app/modules/user/user.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/user/user.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 i18n *ngIf=\"!authService.isLoggedIn\">Welcome to CrowdProj!</h2>\n\n<ul class=\"nav nav-tabs\" *ngIf=\"!authService.isLoggedIn\">\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" routerLink=\"/user/signin\" routerLinkActive=\"active\" i18n>Sign in</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" routerLink=\"/user/signup\" routerLinkActive=\"active\" i18n>Sign up</a>\n  </li>\n</ul>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/modules/user/user.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("../../../../../src/app/modules/user/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_ws_service__ = __webpack_require__("../../../../../src/app/modules/user/services/ws.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_signup__ = __webpack_require__("../../../../../src/app/modules/user/models/signup.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_login__ = __webpack_require__("../../../../../src/app/modules/user/models/login.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var UserComponent = (function () {
    //emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    function UserComponent(authService, wsService, titleService, messageService, route, router) {
        this.authService = authService;
        this.wsService = wsService;
        this.titleService = titleService;
        this.messageService = messageService;
        this.route = route;
        this.router = router;
        this.loginDat = { email: "", password: "" };
        this.signupDat = { email: "", password: "", password1: "", fname: "", lname: "", mname: "" };
        this.emailRegex = "^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$";
    }
    UserComponent.prototype.ngOnInit = function () {
        //        this.titleService.setTitle('Login');
        //        this.state = this.stompService.state
        //            .map((state: number) => StompState[state]);
        this.wsService.check();
    };
    UserComponent.prototype.ngAfterViewInit = function () {
        //        this.routeSub = this.route.params
        //            .subscribe((params: Params) =>  this.switchTo(params['operation']));
    };
    UserComponent.prototype.ngOnDestroy = function () {
        //        this.routeSub.unsubscribe();
    };
    UserComponent.prototype.login = function () {
        var _this = this;
        this.message = 'Trying to log in ...';
        this.authService.login(this.loginDat).subscribe(function () {
            _this.message = null;
            if (_this.authService.isLoggedIn) {
                var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '/';
                _this.router.navigate([redirect]);
            }
        });
    };
    UserComponent.prototype.logout = function () {
        var _this = this;
        this.authService.logout().subscribe(function () {
            if (!_this.authService.isLoggedIn) {
                _this.router.navigate(['/']);
            }
        });
    };
    UserComponent.prototype.switchTo = function (subRoute) {
        switch (subRoute) {
            case "signin":
                if (!this.authService.isLoggedIn) {
                    this.titleService.setTitle('Вход');
                    // this.tabGroup.selectedIndex = 0;
                    return;
                }
                break;
            case "signup":
                if (!this.authService.isLoggedIn) {
                    this.titleService.setTitle('Регистрация');
                    // this.tabGroup.selectedIndex = 1;
                    return;
                }
                break;
            case "signout":
                if (this.authService.isLoggedIn) {
                    this.logout();
                    return;
                }
                break;
            case "profile":
                if (this.authService.isLoggedIn) {
                    this.titleService.setTitle('Профиль');
                    return;
                }
                break;
        }
        if (this.authService.isLoggedIn) {
            // use profile
            this.router.navigate(['/user/profile']);
            return;
        }
        else {
            // use login
            if (!this.authService.redirectUrl && subRoute) {
                this.authService.redirectUrl = '/user/' + subRoute;
            }
            this.router.navigate(['/user/signin']);
            // this.tabGroup.selectedIndex = 0;
        }
    };
    UserComponent.prototype.signup = function () {
        var _this = this;
        this.authService.signup(this.signupDat).subscribe(function (reply) {
            if (reply.result == 'success') {
                _this.switchTo('signin');
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__models_login__["a" /* Login */])
    ], UserComponent.prototype, "loginDat", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__models_signup__["a" /* Signup */])
    ], UserComponent.prototype, "signupDat", void 0);
    UserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-user',
            template: __webpack_require__("../../../../../src/app/modules/user/user.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/user/user.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__services_ws_service__["a" /* WsService */],
            __WEBPACK_IMPORTED_MODULE_6__services_title_service__["a" /* TitleService */],
            __WEBPACK_IMPORTED_MODULE_7__services_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "../../../../../src/app/modules/user/user.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_guard_service__ = __webpack_require__("../../../../../src/app/modules/user/services/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_service__ = __webpack_require__("../../../../../src/app/modules/user/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_ws_service__ = __webpack_require__("../../../../../src/app/modules/user/services/ws.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_routing__ = __webpack_require__("../../../../../src/app/modules/user/user.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_component__ = __webpack_require__("../../../../../src/app/modules/user/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__profile_profile_component__ = __webpack_require__("../../../../../src/app/modules/user/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__signin_signin_component__ = __webpack_require__("../../../../../src/app/modules/user/signin/signin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__signup_signup_component__ = __webpack_require__("../../../../../src/app/modules/user/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__signout_signout_component__ = __webpack_require__("../../../../../src/app/modules/user/signout/signout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__stomp_ng2_stompjs__ = __webpack_require__("../../../../@stomp/ng2-stompjs/@stomp/ng2-stompjs.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



//import { BrowserModule, Title } from '@angular/platform-browser';


//import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';










var stompConfig = {
    // Which server?
    url: 'ws://ws.crowdproj.com/',
    // Headers
    // Typical keys: login, passcode, host
    headers: {},
    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeat_in: 0,
    heartbeat_out: 20000,
    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 5000 (5 seconds)
    reconnect_delay: 5000,
    // Will log diagnostics on console
    debug: true
};
var UserModule = (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__user_component__["a" /* UserComponent */],
                __WEBPACK_IMPORTED_MODULE_10__profile_profile_component__["a" /* UserProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_11__signin_signin_component__["a" /* UserSigninComponent */],
                __WEBPACK_IMPORTED_MODULE_12__signup_signup_component__["a" /* UserSignupComponent */],
                __WEBPACK_IMPORTED_MODULE_13__signout_signout_component__["a" /* UserSignoutComponent */]
            ],
            imports: [
                //        BrowserModule,
                //        BrowserAnimationsModule,
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                //        JsonpModule,
                __WEBPACK_IMPORTED_MODULE_8__user_routing__["a" /* UserRouting */],
                __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__services_auth_guard_service__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_6__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_7__services_ws_service__["a" /* WsService */],
                __WEBPACK_IMPORTED_MODULE_14__stomp_ng2_stompjs__["b" /* StompService */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_14__stomp_ng2_stompjs__["a" /* StompConfig */],
                    useValue: stompConfig
                }
            ]
        })
    ], UserModule);
    return UserModule;
}());



/***/ }),

/***/ "../../../../../src/app/modules/user/user.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_guard_service__ = __webpack_require__("../../../../../src/app/modules/user/services/auth-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_component__ = __webpack_require__("../../../../../src/app/modules/user/user.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile_component__ = __webpack_require__("../../../../../src/app/modules/user/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signin_signin_component__ = __webpack_require__("../../../../../src/app/modules/user/signin/signin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup_component__ = __webpack_require__("../../../../../src/app/modules/user/signup/signup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signout_signout_component__ = __webpack_require__("../../../../../src/app/modules/user/signout/signout.component.ts");
//import { NgModule }             from '@angular/core';


//import { AuthService }          from './services/auth.service';





var userRoutes = [
    {
        path: 'user',
        component: __WEBPACK_IMPORTED_MODULE_2__user_component__["a" /* UserComponent */],
        data: { breadcrumb: 'User' },
        children: [
            {
                path: '',
                component: __WEBPACK_IMPORTED_MODULE_3__profile_profile_component__["a" /* UserProfileComponent */],
                canActivate: [__WEBPACK_IMPORTED_MODULE_1__services_auth_guard_service__["a" /* AuthGuard */]],
                runGuardsAndResolvers: 'always',
                data: { breadcrumb: false },
                pathMatch: 'full'
            },
            {
                path: 'signin',
                component: __WEBPACK_IMPORTED_MODULE_4__signin_signin_component__["a" /* UserSigninComponent */],
                data: { breadcrumb: 'Sign in' },
                pathMatch: 'full'
            },
            {
                path: 'signup',
                component: __WEBPACK_IMPORTED_MODULE_5__signup_signup_component__["a" /* UserSignupComponent */],
                data: { breadcrumb: 'Sign up' },
                pathMatch: 'full'
            },
            {
                path: 'signout',
                component: __WEBPACK_IMPORTED_MODULE_6__signout_signout_component__["a" /* UserSignoutComponent */],
                canActivate: [__WEBPACK_IMPORTED_MODULE_1__services_auth_guard_service__["a" /* AuthGuard */]],
                runGuardsAndResolvers: 'always',
                data: { breadcrumb: 'Sign out' },
                pathMatch: 'full'
            }
        ]
    }
];
/*
@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AuthService
    ]
})
*/
//export class UserRoutingModule {}
var UserRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forChild(userRoutes);


/***/ }),

/***/ "../../../../../src/app/services/hero.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeroService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_message__ = __webpack_require__("../../../../../src/app/models/message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_message_service__ = __webpack_require__("../../../../../src/app/services/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config__ = __webpack_require__("../../../../../src/app/config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HeroService = (function () {
    function HeroService(http, messageService) {
        this.http = http;
        this.messageService = messageService;
        this.prefixUrl = __WEBPACK_IMPORTED_MODULE_8__config__["a" /* Config */].REST_HERO; // URL to web API
    }
    HeroService.prototype.getHeroes = function () {
        var _this = this;
        var url = this.prefixUrl + "/index";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .get(url)
            .map(function (result) { return _this.extractData(result, 'heroes'); })
            .catch(function (error) { return _this.handleError(error); });
    };
    HeroService.prototype.getHero = function (id) {
        var _this = this;
        var url = this.prefixUrl + "/view?id=" + id;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .get(url)
            .map(function (result) { return _this.extractData(result, 'hero'); })
            .catch(function (error) { return _this.handleError(error); });
    };
    HeroService.prototype.create = function (hero) {
        var _this = this;
        var url = this.prefixUrl + "/create";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .post(url, JSON.stringify(hero), { headers: headers })
            .map(function (result) { return _this.extractData(result, 'hero'); })
            .catch(function (error) { return _this.handleError(error); });
    };
    HeroService.prototype.update = function (hero) {
        var _this = this;
        var url = this.prefixUrl + "/update?id=" + hero.id;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .post(url, JSON.stringify(hero), { headers: headers })
            .map(function (result) { return _this.extractData(result, 'hero'); })
            .catch(function (error) { return _this.handleError(error); });
        //            .catch(this.handleError);
    };
    HeroService.prototype.delete = function (hero) {
        var _this = this;
        var url = this.prefixUrl + "/delete?id=" + hero.id;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .post(url, '', { headers: headers })
            .map(function (result) { return _this.extractData(result, 'result'); })
            .catch(function (error) { return _this.handleError(error); });
        //            .catch(this.handleError);
    };
    HeroService.prototype.search = function (term) {
        var _this = this;
        var url = this.prefixUrl + "/search?term=" + term;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .get(url)
            .map(function (result) { return _this.extractData(result, 'heroes'); })
            .catch(function (error) { return _this.handleError(error); });
        //            .catch(this.handleError);
    };
    HeroService.prototype.extractData = function (res, field) {
        var body = res.json();
        if (body[field]) {
            return body[field];
        }
        return body || null;
    };
    HeroService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Response */]) {
            var err = void 0;
            try {
                var body = error.json();
                err = body.error || JSON.stringify(body);
            }
            catch (e) {
                err = '';
            }
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.messageService.sendMessage({
            type: __WEBPACK_IMPORTED_MODULE_6__models_message__["a" /* Message */].MESSAGE_TYPE_ERROR,
            title: 'Server connection error',
            text: errMsg,
        });
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].throw(errMsg);
    };
    HeroService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_7__services_message_service__["a" /* MessageService */]])
    ], HeroService);
    return HeroService;
}());



/***/ }),

/***/ "../../../../../src/app/services/message.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var messages = [];
var MessageService = (function () {
    function MessageService() {
        this.messageCounter = 0;
        this.messages = [];
        this.subject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["b" /* Subject */]();
    }
    MessageService.prototype.sendMessage = function (message) {
        if (message != null) {
            message.id = this.messageCounter++;
            this.messages.push(message);
            this.subject.next(this.messages);
        }
    };
    /*
        clearMessage() {
            this.subject.next();
        }
    */
    MessageService.prototype.getMessages = function () {
        return this.subject.asObservable();
    };
    MessageService.prototype.getMessage = function (id) {
        var messages = this.messages.filter(function (message) { return message.id == id; });
        return messages[0];
    };
    MessageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "../../../../../src/app/services/template.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { Observable } from 'rxjs/Observable';

//import 'rxjs/add/observable/fromEvent';
var TemplateService = (function () {
    function TemplateService() {
        var _this = this;
        /*
                this.obs = Observable.merge(
                        Observable.of(null),
                        Observable.fromEvent(window, 'resize'),
                        Observable.fromEvent(window, 'orientationchange')
                    )
                    .map((event:any) => this.detectTemplate(event));
        */
        this.obs = __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["a" /* Observable */].of(null)
            .map(function (event) { return _this.detectTemplate(event); });
    }
    TemplateService.prototype.getTemplate = function () {
        return this.obs;
    };
    TemplateService.prototype.detectTemplate = function (event) {
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
    };
    TemplateService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], TemplateService);
    return TemplateService;
}());



/***/ }),

/***/ "../../../../../src/app/services/title.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TitleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__("../../../../../src/app/config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TitleService = (function () {
    function TitleService(titleService) {
        this.titleService = titleService;
        this.subject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["b" /* Subject */]();
    }
    TitleService.prototype.setTitle = function (title) {
        this.subject.next(title);
        var gtitle;
        if (title == null || title == '') {
            gtitle = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* Config */].APP_NAME;
        }
        else {
            gtitle = title + ' - ' + __WEBPACK_IMPORTED_MODULE_3__config__["a" /* Config */].APP_NAME;
        }
        this.titleService.setTitle(gtitle);
    };
    TitleService.prototype.getTitle = function () {
        return this.subject.asObservable();
    };
    TitleService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* Title */]])
    ], TitleService);
    return TitleService;
}());



/***/ }),

/***/ "../../../../../src/app/templates/desktop/desktop.template.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".wrap {\n    min-height: 100%;\n    height: auto;\n    margin: 0 auto -60px;\n    padding: 0 0 60px;\n}\n\n.wrap > .container {\n    padding: 70px 15px 20px;\n}\n\n.btn-breadcrumb .btn:not(:last-child):before {\n  content: \" \";\n  display: block;\n  width: 0;\n  height: 0;\n  border-top: 17px solid transparent;\n  border-bottom: 17px solid transparent;\n  border-left: 10px solid rgb(173, 173, 173);\n  position: absolute;\n  top: 50%;\n  margin-top: -17px;\n  margin-left: 1px;\n  left: 100%;\n  z-index: 3;\n}\n\n/** The Spacing **/\n.btn-breadcrumb .btn {\n  padding:6px 12px 6px 24px;\n}\n.btn-breadcrumb .btn:first-child {\n  padding:6px 6px 6px 10px;\n}\n.btn-breadcrumb .btn:last-child {\n  padding:6px 18px 6px 24px;\n}\n\n/** Default button **/\n.btn-breadcrumb .btn.btn-default:not(:last-child):after {\n  border-left: 10px solid #fff;\n}\n.btn-breadcrumb .btn.btn-default:not(:last-child):before {\n  border-left: 10px solid #ccc;\n}\n.btn-breadcrumb .btn.btn-default:hover:not(:last-child):after {\n  border-left: 10px solid #ebebeb;\n}\n.btn-breadcrumb .btn.btn-default:hover:not(:last-child):before {\n  border-left: 10px solid #adadad;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/templates/desktop/desktop.template.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrap\">\n<nav class=\"navbar navbar-expand-md navbar-dark bg-dark fixed-top\" *ngIf=\"authService.isLoggedIn\">\n  <a class=\"navbar-brand\" routerLink=\"/\">CrowdProj</a>\n  <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" aria-controls=\"appNavigation\" [attr.aria-expanded]=\"!isCollapsed\" aria-label=\"Toggle navigation\" (click)=\"toggleMenu()\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n\n  <div class=\"collapse navbar-collapse\" id=\"appNavigation\" [ngbCollapse]=\"isCollapsed\">\n\n    <ul class=\"navbar-nav mr-auto\">\n        <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/heroes\" routerLinkActive=\"active\" i18n-title i18n title=\"Tour of Heroes\">Heroes</a>\n        </li>\n    </ul>\n    <ul class=\"navbar-nav ml-auto \">\n        <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/user\" routerLinkActive=\"active\" i18n-title=\"@@profile-title\" title=\"All personal information\">{{authService.user.getName()}}</a>\n        </li>\n        <li class=\"nav-item\">\n            <a class=\"nav-link\" routerLink=\"/user/signout\" routerLinkActive=\"active\" i18n-title=\"@@signout-title\" title=\"Close current user session\" i18n>Sign out</a>\n        </li>\n    </ul>\n  </div>\n</nav>\n\n<div class=\"container\">\n    <div class=\"btn-group btn-breadcrumb\">\n        <ng-template ngFor let-i=\"index\" let-breadcrumb [ngForOf]=\"breadcrumbs\">\n        <a class=\"btn btn-success\" [class.disabled]=\"i == (breadcrumbs.length - 1)\" [routerLink]=\"[breadcrumb.url]\">{{breadcrumb.name}}</a>\n        </ng-template>\n    </div>\n\n    <router-outlet></router-outlet>\n</div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/templates/desktop/desktop.template.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DesktopTemplate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template__ = __webpack_require__("../../../../../src/app/templates/template.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DesktopTemplate = (function (_super) {
    __extends(DesktopTemplate, _super);
    function DesktopTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //    @ViewChild(UserProfile) userProfile: UserProfile
        _this.isCollapsed = true;
        return _this;
    }
    DesktopTemplate.prototype.toggleMenu = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    DesktopTemplate.prototype.ngOnInit = function () {
        document.addEventListener('click', this.offClickHandler.bind(this));
        _super.prototype.ngOnInit.call(this);
    };
    DesktopTemplate.prototype.offClickHandler = function (event) {
        if (!event.target.closest(".navbar-toggler") && !this.isCollapsed) {
            this.isCollapsed = true;
        }
    };
    DesktopTemplate = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-desktop',
            template: __webpack_require__("../../../../../src/app/templates/desktop/desktop.template.html"),
            styles: [__webpack_require__("../../../../../src/app/templates/desktop/desktop.template.css")]
        })
    ], DesktopTemplate);
    return DesktopTemplate;
}(__WEBPACK_IMPORTED_MODULE_1__template__["a" /* Template */]));



/***/ }),

/***/ "../../../../../src/app/templates/template.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Template; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_title_service__ = __webpack_require__("../../../../../src/app/services/title.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_user_services_auth_service__ = __webpack_require__("../../../../../src/app/modules/user/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__("../../../../../src/app/config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var Template = (function () {
    function Template(authService, titleService, router, activatedRoute, location) {
        this.authService = authService;
        this.titleService = titleService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.location = location;
        this.showBack = true;
        this.isHome = true;
        this.title = '';
        this.breadcrumbs = [];
    }
    Template.prototype.ngOnInit = function () {
        var _this = this;
        this.titleSub = this.titleService.getTitle().subscribe(function (title) {
            if (title == '' || title == null) {
                _this.title = __WEBPACK_IMPORTED_MODULE_5__config__["a" /* Config */].APP_NAME;
            }
            else {
                _this.title = title;
            }
        });
        this.routerSub = this.router.events.subscribe(function (event) {
            _this.breadcrumbs = [];
            _this.parseRoute(_this.router.routerState.snapshot.root);
        });
    };
    Template.prototype.ngOnDestroy = function () {
        // unsubscribe to ensure no memory leaks
        this.titleSub.unsubscribe();
        this.routerSub.unsubscribe();
    };
    Template.prototype.parseRoute = function (node) {
        this.showBack = node.data['noBack'] !== true;
        if (node.data['breadcrumb']) {
            var urlSegments_1 = [];
            node.pathFromRoot.forEach(function (routerState) {
                urlSegments_1 = urlSegments_1.concat(routerState.url);
            });
            var url = urlSegments_1.map(function (urlSegment) {
                return urlSegment.path;
            }).join('/');
            this.breadcrumbs.push({
                name: node.data['breadcrumb'],
                url: '/' + url
            });
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    };
    Template.prototype.goBack = function () {
        this.location.back();
    };
    Template = __decorate([
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__modules_user_services_auth_service__["a" /* AuthService */])),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__services_title_service__["a" /* TitleService */])),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */])),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */])),
        __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__modules_user_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__services_title_service__["a" /* TitleService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]])
    ], Template);
    return Template;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
/* harmony export (immutable) */ __webpack_exports__["b"] = getTranslationProviders;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_compiler__ = __webpack_require__("../../../compiler/esm5/compiler.js");


var environment = {
    production: false,
    useOldBrowsers: true
};
// return no providers if fail to get translation file for locale
var noProviders = [];
function getTranslationProviders() {
    // Get the locale id from the global
    var locale;
    (locale = document['locale'])
        || (locale = navigator['language'])
        || (locale = navigator['userLanguage'])
        || (locale = navigator['browserLanguage'])
        || (locale = navigator['systemLanguage']);
    // No locale or U.S. English: no translation providers
    if (!locale || locale === 'en-US') {
        return Promise.resolve(noProviders);
    }
    return getTranslationsWithSystemJs(locale)
        .then(function (translations) {
        return [
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* TRANSLATIONS */], useValue: translations },
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* TRANSLATIONS_FORMAT */], useValue: 'xlf' },
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["H" /* LOCALE_ID */], useValue: locale },
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_compiler__["c" /* CompilerConfig */], useValue: new __WEBPACK_IMPORTED_MODULE_1__angular_compiler__["c" /* CompilerConfig */]({ missingTranslation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* MissingTranslationStrategy */].Error }) }
        ];
    })
        .catch(function () {
        console.log('File not found. We have checked that');
        return noProviders;
    }); // ignore if file not found
}
function getTranslationsWithSystemJs(locale) {
    switch (locale) {
        case 'ru':
            return __webpack_require__.e/* import() */("messages.ru.xlf").then(__webpack_require__.bind(null, "../../../../raw-loader/index.js!../../../../../src/i18n/messages.ru.xlf"));
        case 'de':
            return __webpack_require__.e/* import() */("messages.de.xlf").then(__webpack_require__.bind(null, "../../../../raw-loader/index.js!../../../../../src/i18n/messages.de.xlf"));
        default:
            return Promise.resolve(noProviders);
    }
}


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* enableProdMode */])();
}
// Loading i18n providers
Object(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["b" /* getTranslationProviders */])().then(function (providers) {
    var options = providers;
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */], options);
});


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
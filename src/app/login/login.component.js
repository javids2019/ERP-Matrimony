"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var items_service_1 = require('../shared/utils/items.service');
var notification_service_1 = require('../shared/utils/notification.service');
var authentication_service_1 = require('../shared/utils/authentication.service');
var app_component_1 = require('../app.component');
var router_1 = require('@angular/router');
var LoginComponent = (function () {
    //@Output() isAuthorize: EventEmitter<boolean> = new EventEmitter<boolean>();
    function LoginComponent(itemsService, notificationService, router, authenticationService, loadingBarService, appComponent) {
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.router = router;
        this.authenticationService = authenticationService;
        this.loadingBarService = loadingBarService;
        this.appComponent = appComponent;
        this.errorMsg = '';
        this.isAuthorize = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.errorMsg = '';
        var usertemp = {
            Id: 0,
            Name: '',
            EmailId: '',
            Emailid: '',
            Designation: '',
            Role: '',
            IsActive: '',
            Createdby: '',
            Createddate: '',
            Updatedby: '',
            Updateddate: '',
            Password: '',
        };
        this.user = this.itemsService.getSerialized(usertemp);
        this.authenticationService.logout();
    };
    LoginComponent.prototype.loginUser = function (user) {
        var _this = this;
        user.Emailid = user.EmailId;
        //this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
        if (user && user.EmailId != null && user.Password != null) {
            this.authenticationService.LoginUser(user).subscribe(function (data) {
                if (data === null) {
                    _this.errorMsg = 'Invalid Credentials';
                    _this.notificationService.printSuccessMessage('Login Failed, Invalid Credentials');
                    _this.loadingBarService.complete();
                }
                else {
                    // this.isAuthorize.emit(this.authenticationService.IsAuthorize());
                    //  this.isAuthorize = this.authenticationService.IsAuthorize();
                    _this.appComponent.isAuthorize = true;
                    _this.appComponent.IsUserAuthorize();
                    _this.router.navigate(['/home']);
                    _this.notificationService.printSuccessMessage('Welcome,You have been Logged in Successfully');
                    _this.loadingBarService.complete();
                }
            }, function (error) {
                _this.notificationService.printSuccessMessage('Login Failed, Invalid Credentials');
                _this.loadingBarService.complete();
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            moduleId: module.id,
            providers: [authentication_service_1.AuthenticationService],
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'],
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.state('in', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateX(-100%)'
                        }),
                        core_1.animate('0.6s ease-in')
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate('0.2s 10 ease-out', core_1.style({
                            opacity: 0,
                            transform: 'translateX(100%)'
                        }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [items_service_1.ItemsService, notification_service_1.NotificationService, router_1.Router, authentication_service_1.AuthenticationService, ng2_slim_loading_bar_1.SlimLoadingBarService, app_component_1.AppComponent])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map
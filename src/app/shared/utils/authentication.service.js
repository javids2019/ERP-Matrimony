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
var Observable_1 = require('rxjs/Observable');
var config_service_1 = require('../utils/config.service');
var data_service_1 = require('../../shared/services/data.service');
var items_service_1 = require('../../shared/utils/items.service');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var User = (function () {
    function User(email, password) {
        this.email = email;
        this.password = password;
    }
    return User;
}());
exports.User = User;
var users = [
    new User('admin@admin.com', 'adm9'),
    new User('user1@gmail.com', 'a23')
];
var AuthenticationService = (function () {
    function AuthenticationService(configService, dataService, itemsService, router, http) {
        this.configService = configService;
        this.dataService = dataService;
        this.itemsService = itemsService;
        this.router = router;
        this.http = http;
        this._baseUrl = '';
        this._options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' }) });
        this._baseUrl = configService.getApiURI();
    }
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem("currentUser");
        this.router.navigate(['/login']);
        //this._router.navigate(['Login']);
    };
    AuthenticationService.prototype.LoginUser = function (user) {
        return this.http.post(this._baseUrl + 'Users/Login', JSON.stringify(user), { headers: this._options.headers })
            .map(function (res) {
            var user = res.json();
            if (user && user.EmailId) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return res.json();
        })
            .catch(this.handleError);
    };
    AuthenticationService.prototype.handleError = function (error) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors = '';
        if (!serverError.type) {
            console.log(serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }
        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
        return Observable_1.Observable.throw(applicationError || modelStateErrors || 'Server error');
    };
    AuthenticationService.prototype.checkCredentials = function () {
        if (localStorage.getItem("currentUser") === null) {
            this.router.navigate(['login']);
        }
    };
    AuthenticationService.prototype.IsAuthorize = function () {
        if (localStorage.getItem("currentUser") !== null) {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var user = this.itemsService.getSerialized(currentUser);
            if (user.EmailId != null && user.Name != null)
                return true;
            else
                return false;
        }
    };
    AuthenticationService.prototype.GetAuthorizeLoginDetails = function () {
        if (localStorage.getItem("currentUser") !== null) {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var user = this.itemsService.getSerialized(currentUser);
            if (user.EmailId != null && user.Name != null)
                return user;
            else
                return null;
        }
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [config_service_1.ConfigService, data_service_1.DataService, items_service_1.ItemsService, router_1.Router, http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map
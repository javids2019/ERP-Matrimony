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
var http_1 = require('@angular/http');
//Grab everything with import 'rxjs/Rx';
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var items_service_1 = require('../utils/items.service');
var config_service_1 = require('../utils/config.service');
var DataService = (function () {
    function DataService(http, itemsService, configService) {
        this.http = http;
        this.itemsService = itemsService;
        this.configService = configService;
        this._baseUrl = '';
        this._options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' }) });
        this._baseUrl = configService.getApiURI();
    }
    DataService.prototype.getFollowupProfiles = function (page, itemsPerPage) {
        return this.http.get(this._baseUrl + 'Profiles/GetAllFollowupProfiles/' + page)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.getFreshLeadProfiles = function (page, itemsPerPage) {
        return this.http.get(this._baseUrl + 'Profiles/getFreshLeadProfiles/' + page)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.getFilterProfiles = function (filter) {
        return this.http.post(this._baseUrl + 'Profiles/GetFilterProfiles', JSON.stringify(filter), { headers: this._options.headers })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.getDashboardData = function (filter) {
        return this.http.post(this._baseUrl + 'Profiles/GetDashBoardData', JSON.stringify(filter), { headers: this._options.headers })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.getProfiles = function (page, itemsPerPage, allotedto) {
        return this.http.get(this._baseUrl + 'Profiles/GetAllProfile/' + page)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.GetAllProfileByUser = function (allocatedtoid) {
        // alert(allotedtoid);
        return this.http.get(this._baseUrl + 'Profiles/GetAllProfileByUser/' + allocatedtoid)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.getUsers = function (page, itemsPerPage) {
        return this.http.get(this._baseUrl + 'users/GetAllUsers/' + page)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.getProfileDetails = function (id) {
        return this.http.get(this._baseUrl + 'profiles/GetProfileDetails/' + id)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.getFollowupDetails = function (id) {
        return this.http.get(this._baseUrl + 'profiles/GetFollowupDetails/' + id)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.getFollowupsByProfileId = function (id) {
        return this.http.get(this._baseUrl + 'profiles/getFollowupsByProfileId/' + id)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.getUserDetails = function (id) {
        return this.http.get(this._baseUrl + 'users/GetUserDetails/' + id)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.createUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this._baseUrl + 'users/', JSON.stringify(user), {
            headers: headers
        })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    DataService.prototype.manageUser = function (user) {
        return this.http.post(this._baseUrl + 'Users/ManageUsers', JSON.stringify(user), { headers: this._options.headers })
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    DataService.prototype.manageProfile = function (profile) {
        return this.http.post(this._baseUrl + 'Profiles/ManageProfile', JSON.stringify(profile), { headers: this._options.headers })
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    DataService.prototype.manageFollowupProfile = function (profile) {
        return this.http.post(this._baseUrl + 'Profiles/ManageFollowupProfile', JSON.stringify(profile), { headers: this._options.headers })
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    DataService.prototype.removeUser = function (id) {
        return this.http.get(this._baseUrl + 'users/RemoveUser/' + id)
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    DataService.prototype.removeProfile = function (id) {
        return this.http.get(this._baseUrl + 'users/removeProfile/' + id)
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    DataService.prototype.LoginUser = function (user) {
        return this.http.post(this._baseUrl + 'Users/Login', JSON.stringify(user), { headers: this._options.headers })
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    //     getUsers(page?: number, itemsPerPage?: number): Observable<PaginatedResult<IUser[]>> {
    //         var peginatedResult: PaginatedResult<IUser[]> = new PaginatedResult<IUser[]>();
    // alert(page);
    // alert(itemsPerPage);
    //         let headers = new Headers();
    //         if (page != null && itemsPerPage != null) {
    //             headers.append('Pagination', page + ',' + itemsPerPage);
    //         }
    //         return this.http.get(this._baseUrl + 'users', {
    //             headers: headers
    //         })
    //             .map((res: Response) => {
    //                 console.log(res.headers.keys());
    //                 peginatedResult.result = res.json();
    //                 if (res.headers.get("Pagination") != null) {
    //                     //var pagination = JSON.parse(res.headers.get("Pagination"));
    //                     var paginationHeader: Pagination = this.itemsService.getSerialized<Pagination>(JSON.parse(res.headers.get("Pagination")));
    //                     console.log(paginationHeader);
    //                     peginatedResult.pagination = paginationHeader;
    //                 }
    //                 return peginatedResult;
    //             })
    //             .catch(this.handleError);
    //     }
    // getSchedule(id: number): Observable<ISchedule> {
    //     return this.http.get(this._baseUrl + 'schedules/' + id)
    //         .map((res: Response) => {
    //             return res.json();
    //         })
    //         .catch(this.handleError);
    // }
    // updateSchedule(schedule: ISchedule): Observable<void> {
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     return this.http.put(this._baseUrl + 'schedules/' + schedule.id, JSON.stringify(schedule), {
    //         headers: headers
    //     })
    //         .map((res: Response) => {
    //             return;
    //         })
    //         .catch(this.handleError);
    // }
    DataService.prototype.deleteSchedule = function (id) {
        return this.http.delete(this._baseUrl + 'schedules/' + id)
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    DataService.prototype.deleteScheduleAttendee = function (id, attendee) {
        return this.http.delete(this._baseUrl + 'schedules/' + id + '/removeattendee/' + attendee)
            .map(function (res) {
            return;
        })
            .catch(this.handleError);
    };
    DataService.prototype.handleError = function (error) {
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
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, items_service_1.ItemsService, config_service_1.ConfigService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map
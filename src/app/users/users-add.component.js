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
var router_1 = require('@angular/router');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var data_service_1 = require('../shared/services/data.service');
var items_service_1 = require('../shared/utils/items.service');
var notification_service_1 = require('../shared/utils/notification.service');
var config_service_1 = require('../shared/utils/config.service');
var mapping_service_1 = require('../shared/utils/mapping.service');
var UsersAddComponent = (function () {
    function UsersAddComponent(route, router, dataService, itemsService, notificationService, configService, mappingService, loadingBarService) {
        this.route = route;
        this.router = router;
        this.dataService = dataService;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.configService = configService;
        this.mappingService = mappingService;
        this.loadingBarService = loadingBarService;
        this.isLoaded = true;
        this.roleslist = [
            { value: "Admin", text: "Admin" },
            { value: "Super Admin", text: "Super Admin" },
            { value: "Executive", text: "Executive" },
            { value: "User", text: "User" }
        ];
    }
    UsersAddComponent.prototype.ngOnInit = function () {
        this.apiHost = this.configService.getApiHost();
        this.loadScheduleDetails();
    };
    UsersAddComponent.prototype.loadScheduleDetails = function () {
        this.loadingBarService.start();
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
            Password: ''
        };
        this.user = this.itemsService.getSerialized(usertemp);
        // this.dataService.getUserDetails(this.id)
        //         .subscribe((user: IUser) => {
        //         this.user = this.itemsService.getSerialized<IUser>(user);
        //         this.isLoaded = true;
        //         // Convert date times to readable format
        //         // this.schedule.timeStart = new Date(this.schedule.timeStart.toString()); // new DateFormatPipe().transform(schedule.timeStart, ['local']);
        //         // this.schedule.timeEnd = new Date(this.schedule.timeEnd.toString()); //new DateFormatPipe().transform(schedule.timeEnd, ['local']);
        //         //
        //         // this.types = this.schedule.types;
        //         this.loadingBarService.complete();
        //     },
        //     error => {
        //         this.loadingBarService.complete();
        //         this.notificationService.printErrorMessage('Failed to load schedule. ' + error);
        //     });
    };
    UsersAddComponent.prototype.manageUser = function (user) {
        var _this = this;
        //alert(userModel.name);
        this.dataService.manageUser(user)
            .subscribe(function () {
            _this.notificationService.printSuccessMessage('User data has been created');
            _this.loadingBarService.complete();
        }, function (error) {
            _this.loadingBarService.complete();
            _this.notificationService.printErrorMessage('Failed to create user. ' + error);
        });
    };
    // removeremoveUserAttendee(attendee: IUser) {
    //     this.notificationService.openConfirmationDialog('Are you sure you want to remove '
    //         + attendee.name + ' from this schedule?',
    //         () => {
    //             this.loadingBarService.start();
    //             this.dataService.deleteScheduleAttendee(this.schedule.id, attendee.id)
    //                 .subscribe(() => {
    //                     this.itemsService.removeItemFromArray<IUser>(this.schedule.attendees, attendee);
    //                     this.notificationService.printSuccessMessage(attendee.name + ' will not attend the schedule.');
    //                     this.loadingBarService.complete();
    //                 },
    //                 error => {
    //                     this.loadingBarService.complete();
    //                     this.notificationService.printErrorMessage('Failed to remove ' + attendee.name + ' ' + error);
    //                 });
    //         });
    // }
    UsersAddComponent.prototype.back = function () {
        this.router.navigate(['/users']);
    };
    UsersAddComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-schedule-edit',
            templateUrl: 'users-add.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, data_service_1.DataService, items_service_1.ItemsService, notification_service_1.NotificationService, config_service_1.ConfigService, mapping_service_1.MappingService, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], UsersAddComponent);
    return UsersAddComponent;
}());
exports.UsersAddComponent = UsersAddComponent;
//# sourceMappingURL=users-add.component.js.map
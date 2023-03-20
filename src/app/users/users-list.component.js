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
var ngx_bootstrap_1 = require('ngx-bootstrap');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
var data_service_1 = require('../shared/services/data.service');
var items_service_1 = require('../shared/utils/items.service');
var notification_service_1 = require('../shared/utils/notification.service');
var config_service_1 = require('../shared/utils/config.service');
var UsersListComponent = (function () {
    function UsersListComponent(dataService, itemsService, notificationService, configService, loadingBarService) {
        this.dataService = dataService;
        this.itemsService = itemsService;
        this.notificationService = notificationService;
        this.configService = configService;
        this.loadingBarService = loadingBarService;
        this.itemsPerPage = 10;
        this.totalItems = 0;
        this.currentPage = 1;
        //selectedScheduleLoaded: boolean = false;
        this.selectedUserLoaded = false;
        this.index = 0;
        this.backdropOptions = [true, false, 'static'];
        this.animation = true;
        this.keyboard = true;
        this.backdrop = true;
    }
    UsersListComponent.prototype.ngOnInit = function () {
        this.apiHost = this.configService.getApiHost();
        this.loadSchedules();
    };
    UsersListComponent.prototype.loadSchedules = function () {
        var _this = this;
        this.loadingBarService.start();
        this.dataService.getUsers(this.currentPage, this.itemsPerPage)
            .subscribe(function (result) {
            _this.users = result.result;
            _this.totalItems = result.pagination.TotalItems;
            _this.loadingBarService.complete();
        }, function (error) {
            _this.notificationService.printErrorMessage('Failed to load users. ' + error);
        });
        // this.dataService.getSchedules(this.currentPage, this.itemsPerPage)
        //     .subscribe((res: PaginatedResult<ISchedule[]>) => {
        //         this.schedules = res.result;// schedules;
        //         this.totalItems = res.pagination.TotalItems;
        //         this.loadingBarService.complete();
        //     },
        //     error => {
        //         this.loadingBarService.complete();
        //         this.notificationService.printErrorMessage('Failed to load schedules. ' + error);
        //     });
    };
    UsersListComponent.prototype.pageChanged = function (event) {
        var _this = this;
        this.currentPage = event.page;
        this.dataService.getUsers(this.currentPage, this.itemsPerPage)
            .subscribe(function (result) {
            _this.users = result.result;
            _this.totalItems = result.pagination.TotalItems;
            _this.loadingBarService.complete();
        }, function (error) {
            _this.notificationService.printErrorMessage('Failed to load users. ' + error);
        });
        //console.log('Page changed to: ' + event.page);
        //console.log('Number items per page: ' + event.itemsPerPage);
    };
    ;
    UsersListComponent.prototype.removeUser = function (user) {
        var _this = this;
        this.notificationService.openConfirmationDialog('Are you sure you want to delete this schedule?', function () {
            _this.loadingBarService.start();
            _this.dataService.removeUser(user.Id)
                .subscribe(function () {
                _this.loadSchedules();
                //this.itemsService.removeItemFromArray<IUser>(this.userDetails, user);
                _this.notificationService.printSuccessMessage(user.Name + ' has been deleted.');
                _this.loadingBarService.complete();
            }, function (error) {
                _this.loadingBarService.complete();
                _this.notificationService.printErrorMessage('Failed to delete ' + user.Name + ' ' + error);
            });
        });
    };
    UsersListComponent.prototype.viewUserDetails = function (id) {
        var _this = this;
        this.selectedUserId = id;
        this.dataService.getUserDetails(this.selectedUserId)
            .subscribe(function (user) {
            _this.userDetails = _this.itemsService.getSerialized(user);
            // Convert date times to readable format
            // this.scheduleDetails.timeStart = new DateFormatPipe().transform(schedule.timeStart, ['local']);
            // this.scheduleDetails.timeEnd = new DateFormatPipe().transform(schedule.timeEnd, ['local']);
            _this.loadingBarService.complete();
            _this.selectedUserLoaded = true;
            _this.childModal.show(); //.open('lg');
        }, function (error) {
            _this.loadingBarService.complete();
            _this.notificationService.printErrorMessage('Failed to load schedule. ' + error);
        });
    };
    UsersListComponent.prototype.hideChildModal = function () {
        this.childModal.hide();
    };
    __decorate([
        core_1.ViewChild('childModal'), 
        __metadata('design:type', ngx_bootstrap_1.ModalDirective)
    ], UsersListComponent.prototype, "childModal", void 0);
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', Object)
    ], UsersListComponent.prototype, "modal", void 0);
    UsersListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-schedules',
            templateUrl: 'users-list.component.html',
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.state('in', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    core_1.transition('void => *', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateX(-100%)'
                        }),
                        core_1.animate('0.5s ease-in')
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
        __metadata('design:paramtypes', [data_service_1.DataService, items_service_1.ItemsService, notification_service_1.NotificationService, config_service_1.ConfigService, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], UsersListComponent);
    return UsersListComponent;
}());
exports.UsersListComponent = UsersListComponent;
//# sourceMappingURL=users-list.component.js.map
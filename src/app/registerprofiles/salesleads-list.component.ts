import { Component, OnInit, ViewChild, Input, Output,
    trigger,
    state,
    style,
    animate,
    transition } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationsService } from 'angular2-notifications';
import { ConfigService } from '../shared/utils/config.service';
import { IUser, IRegisterProfile, IFilter, Pagination, PaginatedResult, LeadsCountResult, IProfileResults } from '../shared/interfaces';
import { AuthenticationService } from '../shared/utils/authentication.service'
@Component({
    moduleId: module.id,
    selector: 'app-schedules',
    templateUrl: 'salesleads-list.component.html',
    
})

export class Salesleadslistcomponent implements OnInit {
    @ViewChild('childModal') public childModal: ModalDirective;
    profiles: IProfileResults[];
    apiHost: string;
    selectedId: number;
    listFilter: string;
    filter: IFilter;
    nameSearch: string;
    allocatedToSearch: string;
    statusSearch: string;
    public selectedStatus: string;
    userList: IUser[];
    SalesType: string ='SalesType';
    public itemsPerPage: number = 10;
    public totalItems: number = 0;
    public currentPage: number = 1;
    public registerType: string = 'All';
    public leadsCountResult: LeadsCountResult;

    public openLeadsCount: number;
    public todayFollowupCount: number;
    public followupCount: number;
    public promiseToPayCount: number;
    public walkinCount: number;
    public leadClosedCount: number;
    public totalAllCount: number;
    roleName: string;
    loginuserid: number;
    @ViewChild('modal')
    modal: any;
    selected: string;
    userDetails: IUser;
    IsSelectedLoaded: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    type: string = 'FreshLead';
    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationsService,
        private configService: ConfigService,
        private loadingBarService: SlimLoadingBarService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.clarfilter();
        this.loadDashboardData();
        this.dataService.getUsers()
            .subscribe((result: PaginatedResult<IUser[]>) => {
                this.userList = result.result;
            },
            error => {
                this.notificationService.error('Failed to load users. ' + error);
            });
    }

    clarfilter() {
        var loginuser = this.authenticationService.GetAuthorizeLoginDetails();
        this.filter = new IFilter();
        this.filter.page = 1; 
        this.currentPage = 1;
        this.filter.RoleName = loginuser.Role;
        if (this.filter.RoleName != 'Admin')
            this.loginuserid = loginuser.Id;
        else
            this.loginuserid = 0;
        this.filter.allocatedtoId = this.loginuserid;
         this.filter.SalesType = this.SalesType;
        this.filter.status = "OpenLeads";
        this.filter.registerType = this.registerType;
        this.loadfilter(this.filter);
    }

    loadDashboardData() {


        this.filter.allocatedtoId = this.loginuserid;
        this.currentPage = 1;
        this.filter.page = 1;
        this.filter.status = "OpenLeads";
        this.filter.SalesType = this.SalesType;
        this.filter.status = "OpenLeads";
        this.filter.registerType = this.registerType;

        this.dataService.getDashboardData(this.filter)
            .subscribe((result: PaginatedResult<IProfileResults[]>) => {
                this.totalItems = result.pagination.TotalItems;
                this.followupCount = result.leadsCountResult.FollowupCount;
                this.leadClosedCount = result.leadsCountResult.LeadClosedCount;
                this.openLeadsCount = result.leadsCountResult.OpenLeadsCount;
                this.promiseToPayCount = result.leadsCountResult.PromiseToPayCount;
                this.todayFollowupCount = result.leadsCountResult.TodayFollowupCount;
                this.totalAllCount = result.leadsCountResult.TotalAllCount;
                this.walkinCount = result.leadsCountResult.WalkinCount;

                this.loadingBarService.complete();

            },
            error => {
                this.notificationService.error('Failed to load users. ' + error);
            });
        this.loadfilter(this.filter);
    }

    loadfilter(filter: IFilter) {
        //  this.loadingBarService.start();
        //alert(this.leadsCountResult);
        this.dataService.getFilterProfiles(filter)
            .subscribe((result: PaginatedResult<IProfileResults[]>) => {
                this.profiles = result.result;
                this.totalItems = result.pagination.TotalItems;
                this.loadingBarService.complete();
            },
            error => {
                this.notificationService.error('Failed to load users. ' + error);
            });
    }

    loadProfiles() {
        this.loadingBarService.start();
        this.filter.page = 1;
        this.currentPage = 1;
        // filter.allocatedtoId = this.loginuserid;
        this.filter.status = null;
        this.filter.registerType = this.registerType;
        this.dataService.getFilterProfiles(this.filter)
            .subscribe((result: PaginatedResult<IProfileResults[]>) => {
                this.profiles = result.result;
                this.totalItems = result.pagination.TotalItems;
                this.loadingBarService.complete();
            },
            error => {
                this.notificationService.error('Failed to load users. ' + error);
            });
    }

    removeprofile(id: number, name: string) {
        //this.notificationService.openConfirmationDialog('Are you sure you want to delete this profile?',
        //    () => {
        //        this.loadingBarService.start();
        //        this.dataService.removeProfile(id)
        //            .subscribe(() => {
        //                this.ngOnInit();
        //                //this.itemsService.removeItemFromArray<IUser>(this.userDetails, user);
        //                this.notificationService.printSuccessMessage(name + ' Profile has been deleted.');
        //                this.loadingBarService.complete();
        //            },
        //            error => {
        //                this.loadingBarService.complete();
        //                this.notificationService.printErrorMessage('Failed to delete ' + error);
        //            });
        //    });
    }

    getProfilesFilter(status: string, allocatedto: string) {
        //var loginuser = this.authenticationService.GetAuthorizeLoginDetails();


        //  var filter = new IFilter();
        this.filter.page = 1;
        this.currentPage = 1;
        this.filter.SalesType = this.SalesType;
        this.filter.allocatedtoId = this.loginuserid;
        this.filter.allocatedto = allocatedto; 
        this.filter.status = status; 
       // this.filter.registerType = this.registerType;
        this.loadfilter(this.filter);
    }



    onSearch(event: any, type: string) { // without type info
        this.filter.page = 1;
        this.currentPage = 1;
        this.filter.SalesType = this.SalesType;
        if (type == "Name")
            this.filter.Name = event.target.value;
        else if (type == "MatId")
            this.filter.MatId = event.target.value;
        else if (type == "lookingFor")
            this.filter.lookingFor = event.target.value;
        else if (type == "MobileNo")
            this.filter.MobileNo = event.target.value;
        else if (type == "CashType")
            this.filter.CashType = event.target.value;
        else if (type == "Duration")
            this.filter.Duration = event.target.value;
        else if (type == "Amount")
            this.filter.Amount = event.target.value;
        else if (type == "EmailId")
            this.filter.EmailId = event.target.value;
        else if (type == "allocatedto")
            this.filter.allocatedto = event.target.value;
        else if (type == "Status")
            this.filter.status = event.target.value;
        else if (type == "City")
            this.filter.City = event.target.value;
        else if (type == "City")
            this.filter.City = event.target.value;

        this.loadfilter(this.filter);
    }


    pageChanged(event: any): void {
        this.currentPage = event.page;
        this.filter.page = event.page;
        this.loadfilter(this.filter);
    };

    removeUser(user: IUser) {
        //this.notificationService.openConfirmationDialog('Are you sure you want to delete this schedule?',
        //    () => {
        //        this.loadingBarService.start();
        //        this.dataService.removeUser(user.Id)
        //            .subscribe(() => {
        //                this.loadProfiles();
        //                //this.itemsService.removeItemFromArray<IUser>(this.userDetails, user);
        //                this.notificationService.printSuccessMessage(user.Name + ' has been deleted.');
        //                this.loadingBarService.complete();
        //            },
        //            error => {
        //                this.loadingBarService.complete();
        //                this.notificationService.printErrorMessage('Failed to delete ' + user.Name + ' ' + error);
        //            });
        //    });
    }

    viewUserDetails(id: number) {
        this.selectedId = id;
        this.dataService.getUserDetails(this.selectedId)
            .subscribe((user: IUser) => {
                this.userDetails = this.itemsService.getSerialized<IUser>(user);
                // Convert date times to readable format
                // this.scheduleDetails.timeStart = new DateFormatPipe().transform(schedule.timeStart, ['local']);
                // this.scheduleDetails.timeEnd = new DateFormatPipe().transform(schedule.timeEnd, ['local']);
                this.loadingBarService.complete();
                this.IsSelectedLoaded = true;
                this.childModal.show();//.open('lg');
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.error('Failed to load schedule. ' + error);
            });
    }

    public hideChildModal(): void {
        this.childModal.hide();
    }
}
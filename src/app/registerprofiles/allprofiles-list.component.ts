import {
    Component, OnInit, ViewChild, Input, Output,
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router, ActivatedRoute } from '@angular/router';
import {IMyDpOptions, IMyDateModel} from  'mydatepicker';
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
    templateUrl: 'allprofiles-list.component.html',
    //directives: [DeleteDirectives]
})

export class AllProfilesListComponent implements OnInit {
    @ViewChild('childModal') public childModal: ModalDirective;
    profiles: IProfileResults[];
    apiHost: string;
    selectedId: number;
    listFilter: string;

    deleteId: number;
    deleteUserName: string;

    filter: IFilter;
    nameSearch: string;
    allocatedToSearch: string;
    statusSearch: string;
    public selectedStatus: string;
    userList: IUser[];
    SalesType: string;
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
    IsShowDeletePopup: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
    type: string = 'FreshLead';
    private NextFollowup: Date;
    private EndDate: Object = { date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } };



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

        if (this.filter.RoleName == 'Admin') {
            this.filter.allocatedtoId = 0;
            this.filter.allocatedto = "";
        }
        else {
            this.loginuserid = loginuser.Id;
            this.filter.allocatedtoId = this.loginuserid;
            this.filter.allocatedto = loginuser.Name;
        }

        // this.filter.SalesType = this.SalesType;
        this.filter.status = "All";
        this.filter.registerType = this.registerType;
        this.loadfilter(this.filter);
    }

    loadDashboardData() {
        //var loginuser = this.authenticationService.GetAuthorizeLoginDetails();

        //this.filter.RoleName = loginuser.Role;
        //if (this.filter.RoleName != 'Admin')
        //    this.loginuserid = loginuser.Id;
        //else
        //    this.loginuserid = 0;
        //this.filter.allocatedtoId = this.loginuserid;

        this.currentPage = 1;
        this.filter.page = 1;
        this.filter.status = "All";
        //   this.filter.SalesType = this.SalesType;

        //filter.registerType = this.registerType;

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

    onNextFollowupDateChanged(event: IMyDateModel) {
        if (event.jsdate != null) {
            var formatdate = new Date(event.jsdate);
            this.filter.NextFollowup = formatdate;
            //console.log(this.filter.NextFollowup.toUTCString());
        }
        else
            this.filter.NextFollowup = null;

        this.loadfilter(this.filter);
    }

    getDateFromString(myString: any) {
        var array = myString.split('/');
        console.log(parseInt(array[2]), parseInt(array[1]), parseInt(array[0]));
        return new Date(parseInt(array[2]), parseInt(array[1]) - 1, parseInt(array[0]), 0, 0, 0, 0);
    }

    onCreatedDateChanged(event: IMyDateModel) {
        if (event.jsdate != null) {
            var formatdate = new Date(event.jsdate);
            this.filter.CreatedDate = formatdate;
        }
        else
            this.filter.CreatedDate = null;

        this.loadfilter(this.filter);
    }


    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
        todayBtnTxt: 'Today',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
        disableUntil: { year: 2017, month: 6, day: 1 }
    };

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
        //  this.filter.registerType = this.registerType;
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

   

    getProfilesFilter(status: string, allocatedto: string) {
        var loginuser = this.authenticationService.GetAuthorizeLoginDetails();
        this.loginuserid = loginuser.Id;

        //  var filter = new IFilter();
        this.filter.page = 1;
        this.currentPage = 1;
        this.filter.SalesType = this.SalesType;
        //this.filter.allocatedtoId = this.loginuserid;
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

        this.loadfilter(this.filter);
    }


    pageChanged(event: any): void {
        this.currentPage = event.page;
        this.filter.page = event.page;
        this.loadfilter(this.filter);
    };



    modelConfirm(id: number, name: string) {
        this.deleteId = id;
        this.deleteUserName = name;
        this.IsShowDeletePopup = true;
        this.childModal.show();
    }

    removeprofile() {
        this.loadingBarService.start();
        if (this.deleteId > 0 && this.deleteUserName != '') {
            this.dataService.removeProfile(this.deleteId)
                .subscribe(() => {
                    this.ngOnInit();
                    //this.itemsService.removeItemFromArray<IUser>(this.userDetails, user);
                    this.notificationService.success(this.deleteUserName + ' Profile has been deleted.');
                    this.hideChildModal();
                    this.loadingBarService.complete();
                },
                error => {
                    this.loadingBarService.complete();
                    this.notificationService.error('Failed to delete ' + error);
                });
        }
    }

    public hideChildModal(): void {
        this.deleteId = 0;
        this.deleteUserName = '';
        this.childModal.hide();
    }
}
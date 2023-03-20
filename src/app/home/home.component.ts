import { Component, OnInit, trigger, state, style, animate, transition } from '@angular/core';
declare let componentHandler: any;
import { ModalDirective } from 'ngx-bootstrap';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { DataService } from '../shared/services/data.service';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationsService } from 'angular2-notifications';
import { ConfigService } from '../shared/utils/config.service';
import { IUser, IRegisterProfile, IFilter, Pagination, PaginatedResult, LeadsCountResult, IProfileResults } from '../shared/interfaces';
import { AuthenticationService } from '../shared/utils/authentication.service'
import {IMyDpOptions, IMyDateModel} from  'mydatepicker';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    //animations: [
    //    trigger('flyInOut', [
    //        state('in', style({ opacity: 1, transform: 'translateX(0)' })),
    //        transition('void => *', [
    //            style({
    //                opacity: 0,
    //                transform: 'translateX(-100%)'
    //            }),
    //            animate('0.6s ease-in')
    //        ]),
    //        transition('* => void', [
    //            animate('0.2s 10 ease-out', style({
    //                opacity: 0,
    //                transform: 'translateX(100%)'
    //            }))
    //        ])
    //    ])
    //]
})
export class HomeComponent implements OnInit {
    public totalItems: number = 0;
    public openLeadsCount: number = 0;
    public todayFollowupCount: number = 0;
    public followupCount: number = 0;
    public promiseToPayCount: number = 0;
    public walkinCount: number = 0;
    public leadClosedCount: number = 0;
    public totalAllCount: number = 0;
    public filter: IFilter;
    public NotconnectedCount: number = 0;
    public NotInterestedCount: number = 0;
    public SwitchedOffCount: number = 0;
    public RNRCount: number = 0;
    public MarriageFixedCount: number = 0;
    userList: IUser[];
    public selectedStatus: string;
    public registerType: string = 'All';
    loginuserid: number;
    public CallReachableCount: number = 0;
    public CallNotReachableCount: number = 0;
    public TargetAmount: number = 0;
    public RemainingAmount: number = 0;
    public loginuserName: string;
    public roleName: string = "";
    public FollowupCount: number = 0;
    private StartDate: Object = { date: {} };
    private EndDate: Object = { date: {} };

    constructor(private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationsService,
        private configService: ConfigService,
         private loadingBarService: SlimLoadingBarService,
        private authenticationService: AuthenticationService) {

    }
    ngOnInit() {

        this.loadingBarService.start(() => {
            console.log('Loading complete');
        });

        this.filter = new IFilter();
        var dt1 = new Date();
        this.StartDate = { date: { year: dt1.getFullYear(), month: dt1.getMonth() + 1, day: dt1.getDate() } };
        this.EndDate = { date: { year: dt1.getFullYear(), month: dt1.getMonth() + 1, day: dt1.getDate() } };

        console.log(this.StartDate);
        console.log(this.EndDate);
        this.loadDashboardData();

        this.dataService.getUsers()
            .subscribe((result: PaginatedResult<IUser[]>) => {
                this.userList = result.result;
            },
            error => {
                this.notificationService.error('Failed to load users. ' + error);
            });

        var loginuser = this.authenticationService.GetAuthorizeLoginDetails();

        if (loginuser.Role != "Admin") {
            this.filter.allocatedto = loginuser.Name;
            this.filter.allocatedtoId = loginuser.Id;
        }

        else {
            this.filter.allocatedtoId = 0;
            this.roleName = "Admin";
        }

        var dt = new Date();
        this.StartDate = { date: { year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDate() } };
        this.EndDate = { date: { year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDate() } };
        console.log(this.StartDate);
    }

    private addMonths(date: Date, nomonths: number): Date {
        date.setMonth(date.getMonth() + nomonths);
        return date;
    }

    private myStarDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        todayBtnTxt: 'Today',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
        disableUntil: { year: 2017, month: 4, day: 1 }
    };

    private myEndDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        todayBtnTxt: 'Today',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
        disableUntil: { year: 2017, month: 4, day: 1 }
    };

    onSearch(event: any, type: string) { // without type info
        //alert(event.target);
        if (type == "allocatedto")
            this.filter.allocatedto = event.target.value;
        else if (type == "registerType")
            this.filter.registerType = event.target.value;
        this.filterdata(this.filter);

    }
    onStartDateChanged(event: IMyDateModel) {

        var formatdate = new Date(event.jsdate);
        // var localdate = formatdate.toLocaleDateString();
        //console.log(localdate); 
        this.filter.StartDate = formatdate;
        console.log(this.filter.StartDate);
        this.filterdata(this.filter);
    }

    onEndDateChanged(event: IMyDateModel) {

        var formatdate = new Date(event.jsdate);
        this.filter.EndDate = formatdate;
        // console.log(this.filter.EndDate);
        this.filterdata(this.filter);
    }

    loadDashboardData() {
        var loginuser = this.authenticationService.GetAuthorizeLoginDetails();
        this.loginuserid = loginuser.Id;
        this.loginuserName = loginuser.Name;
        var emailid = loginuser.EmailId;

        this.filter = new IFilter();
        this.filter.StartDate = new Date();
        this.filter.EndDate = new Date();


        this.filter.registerType = this.registerType;
        //  this.filter.allocatedto = emailid;
        if (loginuser.Role != "Admin") {
            this.filter.allocatedto = loginuser.Name;
            this.filter.allocatedtoId = loginuser.Id;
        }
        else {
            this.filter.allocatedtoId = 0;
            this.roleName = "Admin";
        }

        this.filterdata(this.filter);
    }


    filterdata(filter: IFilter) {
        //   alert(filter.StartDate);
        this.dataService.getDashboardData(filter)
            .subscribe((result: PaginatedResult<IProfileResults[]>) => {
                this.totalItems = result.pagination.TotalItems;
                this.followupCount = result.leadsCountResult.FollowupCount;
                this.leadClosedCount = result.leadsCountResult.LeadClosedCount;
                this.openLeadsCount = result.leadsCountResult.OpenLeadsCount;
                this.promiseToPayCount = result.leadsCountResult.PromiseToPayCount;
                this.todayFollowupCount = result.leadsCountResult.TodayFollowupCount;
                this.totalAllCount = result.leadsCountResult.TotalAllCount;
                this.walkinCount = result.leadsCountResult.WalkinCount;
                this.FollowupCount = result.leadsCountResult.FollowupCount;
                this.CallReachableCount = result.leadsCountResult.CallReachableCount;
                this.CallNotReachableCount = result.leadsCountResult.CallNotReachableCount;
                this.TargetAmount = result.leadsCountResult.TargetAmount;
                this.RemainingAmount = result.leadsCountResult.RemainingAmount;

                this.NotconnectedCount = result.leadsCountResult.NotconnectedCount;
                this.NotInterestedCount = result.leadsCountResult.NotInterestedCount;
                this.RNRCount = result.leadsCountResult.RNRCount;
                this.SwitchedOffCount = result.leadsCountResult.SwitchedOffCount;
                this.MarriageFixedCount = result.leadsCountResult.MarriageFixedCount;
            });
    }
}
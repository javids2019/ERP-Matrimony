import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationsService } from 'angular2-notifications';
import { ConfigService } from '../shared/utils/config.service';
import { MappingService } from '../shared/utils/mapping.service';
import { IRegisterProfile, PaginatedResult, IFollowupProfile, IUser} from '../shared/interfaces';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import {IMyDpOptions, IMyDateModel} from  'mydatepicker';
import { AuthenticationService, User} from '../shared/utils/authentication.service';


@Component({
    moduleId: module.id,
    templateUrl: 'followupprofiles-add.component.html'

})
export class FollowupProfileAddComponent implements OnInit {
    apiHost: string;
    id: number;
    salestype: string;
    profile: IFollowupProfile;
    followupprofiles: IFollowupProfile[];
    isLoaded: boolean = true;
    momentValue: any;
    userList: IUser[];
    statuslist = [
        { value: "Lead Closed", text: "Lead Closed" },
        { value: "FollowUp", text: "FollowUp" },
        { value: "Not Connected", text: "Not Connected" },
        { value: "Not Interested", text: "Not Interested" },
        { value: "Promise To Pay", text: "Promise To Pay" },
        { value: "Walkin", text: "Walkin" },
        { value: "Marriage Fixed", text: "Marriage Fixed" },
        { value: "Duplicate Record", text: "Duplicate Record" },
        { value: "RNR", text: "RNR" },
        { value: "Switched Off", text: "Switched Off" }
    ];

    durationlist = [
        { value: "1 month", text: "1 month" },
        { value: "2 months", text: "2 months" },
        { value: "3 months", text: "3 months" },
        { value: "4 months", text: "4 months" },
        { value: "5 months", text: "5 months" },
        { value: "6 months", text: "6 months" },
        { value: "7 months", text: "7 months" },
        { value: "8 months", text: "8 months" },
        { value: "9 months", text: "9 months" },
        { value: "10 months", text: "10 months" },
        { value: "11 months", text: "11 months" },
        { value: "12 months", text: "12 months" },
        { value: "13 months", text: "13 months" },
        { value: "14 months", text: "14 months" },
        { value: "15 months", text: "15 months" },
        { value: "16 months", text: "16 months" },
        { value: "17 months", text: "17 months" },
        { value: "18 months", text: "18 months" },
        { value: "19 months", text: "19 months" },
        { value: "20 months", text: "20 months" },
        { value: "21 months", text: "21 months" },
        { value: "22 months", text: "22 months" },
        { value: "23 months", text: "23 months" },
        { value: "24 months", text: "24 months" }
    ];

    
    private sub: any;

    constructor(private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private router: Router,
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationsService,
        private configService: ConfigService,
        private mappingService: MappingService,
        private loadingBarService: SlimLoadingBarService) { }

    ngOnInit() {
        this.id = +this.route.snapshot.params['Id'];
        this.salestype = this.route.snapshot.params['stype'];
        this.apiHost = this.configService.getApiHost();
        this.loadProfileDetails();
        this.loadFollowupProfileDetails();
    }

    public setMoment(moment: any): any {
        this.momentValue = moment;
        // Do whatever you want to the return object 'moment'
    }

    onPackageSelection(event: any) { // without type info
        var duration = event.target.value;
        var month = duration.split(' ');
        this.profile.StartDate = new Date();
        if (month.length > 0) {
            var _no = parseInt(month[1]); 
            this.profile.EndDate = this.addMonths(new Date(),_no);
        }

    }


    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        todayBtnTxt: 'Today',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
        // disableUntil: { year: 2016, month: 8, day: 10 }
    };
    private addMonths(date: Date, nomonths: number): Date {
        date.setMonth(date.getMonth()  + nomonths);
        return date;
    }
    

    loadProfileDetails() {
        this.loadingBarService.start();

        var temp: IFollowupProfile = {
            Id: 0,
            RegisterProfileId: 0,
            Name: '',
            lookingfor: '',
            Mobile: '',
            Email: '',
            City: '',
            IsActive: '',
            AllocatedTo: '',
            AllocatedDateTime: null,
            DispositionStatus: '',
            TodayFollowupDate: null,
            TodayFollowupTime: '',
            NextFollowupDate: null,
            NextFollowupTime: '',
            Remarkes: '',
            CreatedBy: '',
            CreatedDate: null,
            UpdatedBy: '',
            UpdatedDate: null,
            timeStart: new Date,
            CashType: '',
            PackageDuration: '',
            Amount: null,
            StartDate: null,
            EndDate: null,
            SalesType: '' 
            
        };
        this.profile = this.itemsService.getSerialized<IFollowupProfile>(temp);
        var loginuser = this.authenticationService.GetAuthorizeLoginDetails();
        this.profile.CreatedBy = loginuser.EmailId;
        //this.profile. = loginuser.EmailId;

        this.dataService.getProfileDetails(this.id)
            .subscribe((pro: IFollowupProfile) => {
                this.profile = this.itemsService.getSerialized<IFollowupProfile>(pro);
                this.profile.RegisterProfileId = this.profile.Id;
                this.profile.Id = 0;
                if (this.salestype == "stype")
                    this.profile.SalesType = "SalesType";
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.error('Failed to load schedule. ' + error);
            });


    }

    loadFollowupProfileDetails() {

        this.dataService.getFollowupsByProfileId(this.id)
            .subscribe((pro: IFollowupProfile[]) => {
                this.followupprofiles = this.itemsService.getSerialized<IFollowupProfile[]>(pro);
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.error('Failed to load schedule. ' + error);
            });

    }


    manageFollowup(profile: IFollowupProfile) {

        this.dataService.manageFollowupProfile(profile)
            .subscribe(() => {
                this.notificationService.success('Profile Followup has been created');
                this.loadFollowupProfileDetails();
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.error('Failed to create Profile Followup. ' + error);
            });
    }


    manageprofile(profile: IRegisterProfile) {

        this.dataService.manageProfile(profile)
            .subscribe(() => {
                this.notificationService.success('Profile has been created');
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.error('Failed to create Profile. ' + error);
            });
    }


    // removeAttendee(attendee: IUser) {
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

    back() {
        this.router.navigate(['/profiles']);
    }

}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationsService } from 'angular2-notifications';
import { ConfigService } from '../shared/utils/config.service';
import { MappingService } from '../shared/utils/mapping.service';
import { IUser } from '../shared/interfaces';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';

@Component({
    moduleId: module.id,
    selector: 'app-schedule-edit',
    templateUrl: 'users-add.component.html'
})
export class UsersAddComponent implements OnInit {
    apiHost: string;
    user: IUser;
    isLoaded: boolean = true;
     roleslist = [
       {value: "Admin", text: "Admin"},
       {value: "Super Admin", text: "Super Admin"},
       {value: "Executive", text: "Executive"},
       {value: "User", text: "User"}
     ];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationsService,
        private configService: ConfigService,
        private mappingService: MappingService,
        private loadingBarService:SlimLoadingBarService) { }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.loadScheduleDetails();
    }
 
    loadScheduleDetails() {
        this.loadingBarService.start(); 

        var usertemp: IUser = {
            Id:0,
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
            TargetAmount:0
        };
         this.user = this.itemsService.getSerialized<IUser>(usertemp);

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
    }

 

manageUser(user: IUser)  {
        //alert(userModel.name);
         this.dataService.manageUser(user)
            .subscribe(() => {
                this.notificationService.success('User data has been created');
                this.loadingBarService.complete();
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.error('Failed to create user. ' + error);
            }); 
    }


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

    back() {
        this.router.navigate(['/users']);
    }

}
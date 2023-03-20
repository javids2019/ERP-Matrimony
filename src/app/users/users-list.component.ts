import { Component, OnInit, ViewChild, Input, Output,
    trigger,
    state,
    style,
    animate,
    transition } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NotificationsService } from 'angular2-notifications';
import { DataService } from '../shared/services/data.service';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { ItemsService } from '../shared/utils/items.service';  
import { ConfigService } from '../shared/utils/config.service';
import { IUser, ISchedule, IScheduleDetails, Pagination, PaginatedResult } from '../shared/interfaces';

@Component({
    moduleId: module.id,
    selector: 'app-schedules',
    templateUrl: 'users-list.component.html',
    //animations: [
    //    trigger('flyInOut', [
    //        state('in', style({ opacity: 1, transform: 'translateX(0)' })),
    //        transition('void => *', [
    //            style({
    //                opacity: 0,
    //                transform: 'translateX(-100%)'
    //            }),
    //            animate('0.5s ease-in')
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
 
export class UsersListComponent implements OnInit  {
    @ViewChild('childModal') public childModal: ModalDirective;
    schedules: ISchedule[];
    apiHost: string;

    public itemsPerPage: number = 10;
    public totalItems: number = 0;
    public currentPage: number = 1;

    // Modal properties
    @ViewChild('modal')
    modal: any;
    selectedUserId: number;
    userDetails: IUser;
    //selectedScheduleLoaded: boolean = false;
    selectedUserLoaded: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;
users: IUser[];
    constructor(
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationsService,
        private configService: ConfigService,
        private loadingBarService:SlimLoadingBarService) { }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.loadSchedules();
    }

 

    loadSchedules() {
        this.loadingBarService.start(); 
           this.dataService.getUsers(this.currentPage, this.itemsPerPage)
            .subscribe((result: PaginatedResult<IUser[]>) => {
                this.users = result.result;
                 this.totalItems = result.pagination.TotalItems;
                 this.loadingBarService.complete();
            },
            error => {
                this.notificationService.error('Failed to load users. ' + error);
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
    }

    pageChanged(event: any): void {
        this.currentPage = event.page;
      
       this.dataService.getUsers(this.currentPage, this.itemsPerPage)
            .subscribe((result: PaginatedResult<IUser[]>) => {
                this.users = result.result;
                 this.totalItems = result.pagination.TotalItems;
                 this.loadingBarService.complete();
            },
            error => {
                this.notificationService.error('Failed to load users. ' + error);
            });
    
        //console.log('Page changed to: ' + event.page);
        //console.log('Number items per page: ' + event.itemsPerPage);
    };
 
    removeUser(user: IUser) {
        //this.notificationService.openConfirmationDialog('Are you sure you want to delete this schedule?',
        //    () => {
        //        this.loadingBarService.start();
        //        this.dataService.removeUser(user.Id)
        //            .subscribe(() => {
        //               this.loadSchedules();
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
        this.selectedUserId = id;
        this.dataService.getUserDetails(this.selectedUserId)
            .subscribe((user: IUser) => {
                this.userDetails = this.itemsService.getSerialized<IUser>(user);
                // Convert date times to readable format
                // this.scheduleDetails.timeStart = new DateFormatPipe().transform(schedule.timeStart, ['local']);
                // this.scheduleDetails.timeEnd = new DateFormatPipe().transform(schedule.timeEnd, ['local']);
                this.loadingBarService.complete();
                this.selectedUserLoaded = true;
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
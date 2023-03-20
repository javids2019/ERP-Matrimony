import { Component, OnInit, ViewContainerRef, Injectable, Input} from '@angular/core';
import { IUser, IRegisterProfile, Pagination, PaginatedResult } from './shared/interfaces';
import { AuthenticationService, User} from './shared/utils/authentication.service'
import { ItemsService } from './shared/utils/items.service';
import { NotificationsService } from 'angular2-notifications';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { Routes, Router, RouterModule } from '@angular/router';


@Component({
    moduleId: module.id,
    providers: [AuthenticationService],
    selector: 'app-classy',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']


})
export class AppComponent implements OnInit {
    public loginuser: IUser;
    public role: string = 'Admin';
    public isAuthorize: boolean = false;
    constructor(
        private viewContainerRef: ViewContainerRef,
        private itemsService: ItemsService,
        private slimLoadingBarService: SlimLoadingBarService,
        private notificationService: NotificationsService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.router = router;
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
        // this.simpleTimer.subscribe('1sec', e => this.IsUserAuthorize());
        //	this.timer2Id = this.simpleTimer.subscribe('10sec', e => this.timer2callback());
        this.IsUserAuthorize();
    }




    public nfyoptions = {
        position: ["bottom", "right"],
        timeOut: 5000,
        lastOnBottom: true,
    }

    ngOnInit() {
        this.slimLoadingBarService.start(() => {
            console.log('Loading complete');
        });
    }

    IsUserAuthorize() {
        this.isAuthorize = this.authenticationService.IsAuthorize();
        this.loginuser = this.authenticationService.GetAuthorizeLoginDetails();
        if (this.loginuser != null)
            this.role = this.loginuser.Role;
        this.authenticationService.checkCredentials();
    }
    logout() {
        // this.simpleTimer.unsubscribe(this.timerId);
        this.authenticationService.logout();
        this.isAuthorize = false;
        // window.location.reload();
    }

}

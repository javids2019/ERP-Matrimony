import { Component, OnInit, ViewChild, Input, Output,EventEmitter,
    trigger,
    state,
    style,
    animate,
    transition } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DataService } from '../shared/services/data.service';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationsService } from 'angular2-notifications';
import { ConfigService } from '../shared/utils/config.service';
import { IUser, IRegisterProfile, Pagination, PaginatedResult } from '../shared/interfaces';
import { AuthenticationService, User} from '../shared/utils/authentication.service'
import { AppComponent } from '../app.component'
import { Router, ActivatedRoute } from '@angular/router';

 
@Component({
    selector: 'login-form',
    moduleId: module.id,
    providers: [AuthenticationService],
    templateUrl: 'login.component.html', 
    styleUrls: ['login.component.css'],
     
})

export class LoginComponent implements OnInit {

    user: IUser;
    public errorMsg = '';
    constructor(
        private itemsService: ItemsService,
        private notificationService: NotificationsService,
        private router: Router,
        private authenticationService: AuthenticationService,
       private loadingBarService: SlimLoadingBarService,
        private appComponent: AppComponent
    ) {
        this.authenticationService = authenticationService;
    }

 

    ngOnInit() {
        this.errorMsg = '';

        var usertemp: IUser = {
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
            Password: '',
            TargetAmount :0
        };
         
  this.user = this.itemsService.getSerialized<IUser>(usertemp);
  this.authenticationService.logout();
  this.appComponent.isAuthorize = false;
  this.appComponent.IsUserAuthorize();
    }

    loginUser(user: IUser) {
       

        user.Emailid =user.EmailId;
  //this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
        if (user && user.EmailId != null && user.Password != null) {
            this.authenticationService.LoginUser(user).subscribe(
                data => { 
                    if (data === null) {
                        this.errorMsg = 'Invalid Credentials';
                        this.notificationService.error('Login Failed, Invalid Credentials');
                         this.loadingBarService.complete();
                    }
                    else {
                           
                        this.appComponent.isAuthorize = true;
                        this.appComponent.IsUserAuthorize();
                        this.router.navigate(['/home']);
                   

                        this.notificationService.success('','Welcome,You have been Logged in Successfully');
                        this.loadingBarService.complete(); 
                    }
                },
                error => {
                    this.notificationService.error('Login Failed, Invalid Credentials');
                    this.loadingBarService.complete();
                });


        }

    }
}


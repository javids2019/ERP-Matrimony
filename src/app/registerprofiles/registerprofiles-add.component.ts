import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationsService } from 'angular2-notifications';
import { ConfigService } from '../shared/utils/config.service';
import { MappingService } from '../shared/utils/mapping.service';
import { IRegisterProfile, PaginatedResult, IUser} from '../shared/interfaces';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { AuthenticationService } from '../shared/utils/authentication.service'
@Component({
    moduleId: module.id,
    selector: 'app-schedule-edit',
    templateUrl: 'registerprofiles-add.component.html'
})
export class RegisterprofileAddComponent implements OnInit {
    apiHost: string;
    id: number;
    profile: IRegisterProfile;
    isLoaded: boolean = true;
    loginuserid: number;
    loginrolename: string;
    userList: IUser[];
    roleslist = [
        { value: "Admin", text: "Admin" },
        { value: "Super Admin", text: "Super Admin" },
        { value: "Executive", text: "Executive" },
        { value: "User", text: "User" }
    ];

    registertypelist = [
        { value: "IM", text: "IM" },
        { value: "CM", text: "CM" },
        { value: "PM", text: "PM" },
    ];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationsService,
        private configService: ConfigService,
        private mappingService: MappingService,
        private loadingBarService: SlimLoadingBarService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.id = +this.route.snapshot.params['Id'];
        this.apiHost = this.configService.getApiHost();
        this.loadProfileDetails();
        var loginuser = this.authenticationService.GetAuthorizeLoginDetails();
        this.loginuserid = loginuser.Id;
        this.loginrolename = loginuser.Role;

    }

    loadProfileDetails() {
        this.loadingBarService.start();

        var temp: IRegisterProfile = {
            Id: 0,
            Name: '',
            lookingfor: '',
            Mobile: '',
            Email: '',
            City: '',
            IsActive: '',
            AllocatedTo: '',
            AllocatedDateTime: null,
            CreatedBy: '',
            CreatedDate: null,
            UpdatedBy: '',
            UpdatedDate: null,
            RegisterType: '',
            MatId: '',
        };
        this.profile = this.itemsService.getSerialized<IRegisterProfile>(temp);


        this.dataService.getUsers()
            .subscribe((result: PaginatedResult<IUser[]>) => {

                if (this.loginrolename === 'Admin')
                    this.userList = result.result;
                else {
                    this.userList = result.result.filter(item => item.Id === this.loginuserid);
                    var collection = result.result.filter(item => item.Id === this.loginuserid);
                    this.profile.AllocatedTo = collection.length < 1 ? null : collection[0].EmailId;
                }
            },
            error => {
                this.notificationService.error('Failed to load users. ' + error);
            });

        if (this.id > 0) {
            // alert(this.id);
            this.loadingBarService.start();
            this.dataService.getProfileDetails(this.id)
                .subscribe((pro) => {
                    this.profile = this.itemsService.getSerialized<IRegisterProfile>(pro);
                    this.isLoaded = true;
                    this.loadingBarService.complete();
                },
                error => {
                    this.loadingBarService.complete();
                    this.notificationService.error('Failed to load schedule. ' + error);
                });
        }
        else {

            var temp: IRegisterProfile = {
                Id: 0,
                Name: '',
                lookingfor: '',
                Mobile: '',
                Email: '',
                City: '',
                IsActive: '',
                AllocatedTo: '',
                AllocatedDateTime: null,
                CreatedBy: '',
                CreatedDate: null,
                UpdatedBy: '',
                UpdatedDate: null,
                RegisterType: '',
                MatId:''
            };
            this.profile = this.itemsService.getSerialized<IRegisterProfile>(temp);

        }

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


    back() {
        this.router.navigate(['/profiles']);
    }

}
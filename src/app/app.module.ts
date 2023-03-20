import {
    Component, OnInit, ViewChild, Input, Output,
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/core';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileFilterPipe } from './registerprofiles/profile-filter.pipe';
import { UsersEditComponent } from './users/users-edit.component';

import { UsersListComponent } from './users/users-list.component';
import { UsersAddComponent } from './users/users-add.component';

import { RegisterprofileAddComponent } from './registerprofiles/registerprofiles-add.component';
import { FollowupProfileAddComponent } from './registerprofiles/followupprofiles-add.component';
import { AllProfilesListComponent } from './registerprofiles/allprofiles-list.component';
import { AuthenticationService, User} from './shared/utils/authentication.service';
import { Salesleadslistcomponent } from './registerprofiles/salesleads-list.component';
import { PaginationModule } from 'ngx-bootstrap';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { MyDatePickerModule } from 'mydatepicker';
import { ModalModule, TimepickerModule, ProgressbarModule, DatepickerModule } from 'ngx-bootstrap';
import { SlimLoadingBarService, SlimLoadingBarComponent } from 'ng2-slim-loading-bar';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { AppComponent }   from './app.component';
import { LoginComponent }   from './login/login.component';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { HomeComponent } from './home/home.component';
import { MobileHideDirective } from './shared/directives/mobile-hide.directive';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { routing } from './app.routes';
import { DataService } from './shared/services/data.service';
import { ConfigService } from './shared/utils/config.service';
import { ItemsService } from './shared/utils/items.service';
import { MappingService } from './shared/utils/mapping.service';
import { NotificationService } from './shared/utils/notification.service';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './shared/utils/lower-case-url-serializer';
//import { NavigationsComponent } from './shared/navigations/navigations.component';
import { AuthGuard } from './shared/auth-guard.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MyDatePickerModule,
        SimpleNotificationsModule.forRoot(),
        DateTimePickerModule, SlimLoadingBarModule.forRoot(),

        FormsModule,
        HttpModule,
        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        PaginationModule.forRoot(),
        routing,
        TimepickerModule.forRoot()
    ],
    declarations: [
        AppComponent,
        DateFormatPipe,
        HighlightDirective,
        HomeComponent,
        MobileHideDirective,
        UsersEditComponent,
        UsersListComponent,
        LoginComponent,
        RegisterprofileAddComponent,
        FollowupProfileAddComponent,
        AllProfilesListComponent,
        Salesleadslistcomponent,
        // SlimLoadingBarComponent,
        UsersAddComponent,
        ProfileFilterPipe,
        // NavigationsComponent

    ],
    providers: [
        ConfigService,
        DataService,
        ItemsService,
        MappingService,
        NotificationService,
        AuthGuard,         AuthenticationService,
        // SlimLoadingBarService
        //SlimLoadingBarService,
        //{
        //    provide: UrlSerializer,
        //    useClass: LowerCaseUrlSerializer
        //}
    ],
    exports: [BrowserModule, SlimLoadingBarModule],

    bootstrap: [AppComponent]
})
export class AppModule { }

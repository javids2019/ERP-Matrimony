import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { UsersListComponent } from './users/users-list.component';
import { RegisterprofileAddComponent } from './registerprofiles/registerprofiles-add.component';
import { FollowupProfileAddComponent } from './registerprofiles/followupprofiles-add.component';
import { UsersEditComponent } from './users/users-edit.component';
import { UsersAddComponent } from './users/users-add.component';
import { AllProfilesListComponent } from './registerprofiles/allprofiles-list.component';
import { AuthGuard } from './shared/auth-guard.service';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { Salesleadslistcomponent } from './registerprofiles/salesleads-list.component';
import { LoginComponent }   from './login/login.component';

const appRoutes: Routes = [

    { path: 'profileleads', component: AllProfilesListComponent, canActivate: [AuthGuard] },
    { path: 'profileleads/:Id/edit', component: RegisterprofileAddComponent, canActivate: [AuthGuard] },
    { path: 'salesleads', component: Salesleadslistcomponent, canActivate: [AuthGuard] },
    { path: 'profiles/add', component: RegisterprofileAddComponent, canActivate: [AuthGuard] },
    { path: 'followup/:Id/add', component: FollowupProfileAddComponent, canActivate: [AuthGuard] },
    { path: 'followup/:Id/add/:stype', component: FollowupProfileAddComponent, canActivate: [AuthGuard] },

    { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
    { path: 'users/:Id/edit', component: UsersEditComponent, canActivate: [AuthGuard] },
    { path: 'users/add', component: UsersAddComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService, User} from '../shared/utils/authentication.service';
//import { AppComponent } from '../app.component';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        this.authenticationService.logout();
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}
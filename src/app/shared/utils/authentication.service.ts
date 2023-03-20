import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import { ConfigService } from '../utils/config.service';
import { IUser  } from '../interfaces';
import { DataService } from '../../shared/services/data.service';
import { ItemsService } from '../../shared/utils/items.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
export class User {
    constructor(
        public email: string,
        public password: string) { }
}
 

@Injectable()
export class AuthenticationService {
    _baseUrl: string = '';
    _options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }, ) });

    constructor(private configService: ConfigService,
        private dataService: DataService,
        private itemsService: ItemsService,
        private router: Router,
        private http: Http) {
        this._baseUrl = configService.getApiURI();
    }

    logout() {
        localStorage.removeItem("currentUser");
        this.router.navigate(['/login']);
    }

    LoginUser(user: IUser): Observable<IUser> {

        return this.http.post(this._baseUrl + 'Users/Login', JSON.stringify(user), { headers: this._options.headers })
            .map((res: Response) => {
                let user = res.json();
                if (user && user.EmailId) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));

                }
                return res.json();
            })
            .catch(this.handleError);
    }



    private handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';

        if (!serverError.type) {
            console.log(serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }

    checkCredentials() {
        if (localStorage.getItem("currentUser") === null) {
            this.router.navigate(['login']);
        }
    }

    IsAuthorize() {
        if (localStorage.getItem("currentUser") !== null) {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var user = this.itemsService.getSerialized<IUser>(currentUser);
            if (user.EmailId != null && user.Name != null)
                return true;
            else
                return false;
        }
    }

    GetAuthorizeLoginDetails() {
        if (localStorage.getItem("currentUser") !== null) {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var user = this.itemsService.getSerialized<IUser>(currentUser);
            if (user.EmailId != null && user.Name != null)
                return user;
            else
                return null;
        }
    }
}


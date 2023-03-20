import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IUser, IRegisterProfile, IProfileResults, IFollowupProfile, Pagination,IFilter, PaginatedResult } from '../interfaces';
import { ItemsService } from '../utils/items.service';
import { ConfigService } from '../utils/config.service';

@Injectable()
export class DataService {

    _baseUrl: string = '';
    _options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8'},)});

    constructor(private http: Http,
        private itemsService: ItemsService,
        private configService: ConfigService) {
        this._baseUrl = configService.getApiURI();
    }

    getFollowupProfiles(page?: number, itemsPerPage?: number): Observable<PaginatedResult<IFollowupProfile[]>> {
        return this.http.get(this._baseUrl + 'Profiles/GetAllFollowupProfiles/' + page)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

      getFreshLeadProfiles(page?: number, itemsPerPage?: number): Observable<PaginatedResult<IRegisterProfile[]>> {
        return this.http.get(this._baseUrl + 'Profiles/getFreshLeadProfiles/' + page)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

getFilterProfiles(filter : IFilter): Observable<PaginatedResult<IProfileResults[]>> {
     return this.http.post(this._baseUrl + 'Profiles/GetFilterProfiles', JSON.stringify(filter), 
     { headers: this._options.headers})
            .map((res: Response) => {
                return  res.json();
            })
            .catch(this.handleError);
      }

getDashboardData(filter: IFilter): Observable<PaginatedResult<IProfileResults[]>> {
    return this.http.post(this._baseUrl + 'Profiles/GetDashBoardData', JSON.stringify(filter),
        { headers: this._options.headers })
        .map((res: Response) => {
            return res.json();
        })
        .catch(this.handleError);
}


       getProfiles(page?: number, itemsPerPage?: number, allotedto?: string): Observable<PaginatedResult<IRegisterProfile[]>> {
        return this.http.get(this._baseUrl + 'Profiles/GetAllProfile/' + page )
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
    
        GetAllProfileByUser(allocatedtoid?: number): Observable<PaginatedResult<IRegisterProfile[]>> {
           // alert(allotedtoid);
        return this.http.get(this._baseUrl + 'Profiles/GetAllProfileByUser/' + allocatedtoid)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    getUsers(page?: number, itemsPerPage?: number): Observable<PaginatedResult<IUser[]>> {
        return this.http.get(this._baseUrl + 'users/GetAllUsers/' + page)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
  
getProfileDetails(id: number): Observable<IFollowupProfile> {
        return this.http.get(this._baseUrl + 'profiles/GetProfileDetails/' + id)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    } 
    getFollowupDetails(id: number): Observable<IFollowupProfile> {
        return this.http.get(this._baseUrl + 'profiles/GetFollowupDetails/' + id)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    } 

      getFollowupsByProfileId(id: number): Observable<IFollowupProfile[]> {
        return this.http.get(this._baseUrl + 'profiles/getFollowupsByProfileId/' + id)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    } 


      getUserDetails(id: number): Observable<IUser> {
        return this.http.get(this._baseUrl + 'users/GetUserDetails/' + id)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    } 

    createUser(user: IUser): Observable<IUser> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this._baseUrl + 'users/', JSON.stringify(user), {
            headers: headers
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    manageUser(user: IUser): Observable<boolean> {

        return this.http.post(this._baseUrl + 'Users/ManageUsers', JSON.stringify(user), { headers: this._options.headers})
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    manageProfile(profile: IRegisterProfile): Observable<boolean> {

        return this.http.post(this._baseUrl + 'Profiles/ManageProfile', JSON.stringify(profile), { headers: this._options.headers})
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

     manageFollowupProfile(profile: IFollowupProfile): Observable<boolean> {

        return this.http.post(this._baseUrl + 'Profiles/ManageFollowupProfile', JSON.stringify(profile), { headers: this._options.headers})
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }


    removeUser(id: number): Observable<boolean> {
        return this.http.get(this._baseUrl + 'users/RemoveUser/' + id)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    removeProfile(id: number): Observable<boolean> {
        return this.http.get(this._baseUrl + 'users/removeProfile/' + id)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

      LoginUser(user: IUser): Observable<IUser> {

        return this.http.post(this._baseUrl + 'Users/Login', JSON.stringify(user), { headers: this._options.headers})
            .map((res: Response) => { 
                return res.json();
            })
            .catch(this.handleError);
    }
    
    

//     getUsers(page?: number, itemsPerPage?: number): Observable<PaginatedResult<IUser[]>> {
//         var peginatedResult: PaginatedResult<IUser[]> = new PaginatedResult<IUser[]>();

// alert(page);
// alert(itemsPerPage);


  

//         let headers = new Headers();
//         if (page != null && itemsPerPage != null) {
//             headers.append('Pagination', page + ',' + itemsPerPage);
//         }

//         return this.http.get(this._baseUrl + 'users', {
//             headers: headers
//         })
//             .map((res: Response) => {
//                 console.log(res.headers.keys());
//                 peginatedResult.result = res.json();

//                 if (res.headers.get("Pagination") != null) {
//                     //var pagination = JSON.parse(res.headers.get("Pagination"));
//                     var paginationHeader: Pagination = this.itemsService.getSerialized<Pagination>(JSON.parse(res.headers.get("Pagination")));
//                     console.log(paginationHeader);
//                     peginatedResult.pagination = paginationHeader;
//                 }
//                 return peginatedResult;
//             })
//             .catch(this.handleError);
//     }

    // getSchedule(id: number): Observable<ISchedule> {
    //     return this.http.get(this._baseUrl + 'schedules/' + id)
    //         .map((res: Response) => {
    //             return res.json();
    //         })
    //         .catch(this.handleError);
    // }

  

    // updateSchedule(schedule: ISchedule): Observable<void> {

    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');

    //     return this.http.put(this._baseUrl + 'schedules/' + schedule.id, JSON.stringify(schedule), {
    //         headers: headers
    //     })
    //         .map((res: Response) => {
    //             return;
    //         })
    //         .catch(this.handleError);
    // }

    deleteSchedule(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'schedules/' + id)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    deleteScheduleAttendee(id: number, attendee: number) {

        return this.http.delete(this._baseUrl + 'schedules/' + id + '/removeattendee/' + attendee)
            .map((res: Response) => {
                return;
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
}
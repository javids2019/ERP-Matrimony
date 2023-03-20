import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    _apiURI: string;

    constructor() {


        if (window.location.hostname == "localhost")
            this._apiURI = 'http://localhost:4398/api/';
        else
            this._apiURI = 'http://apierp.classymatrimony.com/api/';
 
    }

    getApiURI() {
        return this._apiURI;
    }

    getApiHost() {
        return this._apiURI.replace('api/', '');
    }
}
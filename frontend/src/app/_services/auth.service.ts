import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService{
    constructor(private http: Http){}

    headers = new Headers();


    login(username: string, password: string)
    {
        this.headers.append('Content-Type', "application/x-www-form-urlencoded");
        this.headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

        return this.http.get('http://127.0.0.1:8000/api/v1/user/', {headers: this.headers});
    }

    logout(): void 
    {
        localStorage.removeItem('loggedinUser');
    }
}
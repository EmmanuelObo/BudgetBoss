import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService{
    constructor(private http: Http){}

    headers = new Headers();
    user: any = {}

    login(username: string, password: string)
    {
        this.headers.set('Content-Type', "application/x-www-form-urlencoded");
        this.headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

        let url:string = 'http://127.0.0.1:8000/api/v1/user/?objects_only=true';

        return this.http.get(url, {headers: this.headers})
        .map((response: Response)=>{
            console.log('Response (not parsed): ' + response.json())
            let body: Object = JSON.parse(response['_body']);
            let data:Object = body['objects'][0];
            console.log(data);
            localStorage.setItem('loggedinUser', data['username']);
        })
        
        ;
    }

    logout(): void 
    {
        localStorage.removeItem('loggedinUser');
    }
}
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User, List, Item, Category } from "../_models/index";
import { ItemService } from '../_services/index';
import { host, userURI, Priority, slash, registerPath } from '../_constants/index';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService{
    constructor(private http: Http){}

    headers = new Headers();
    user: User;
    

    login(username: string, password: string)
    {
        this.headers.set('Content-Type', "application/x-www-form-urlencoded");
        this.headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

        let url:string = host + userURI;

        return this.http.get(url, {headers: this.headers})
        .map((response: Response)=>{
            this.user = response.json()['objects'][0];
            console.log(this.user);
            localStorage.setItem('loggedinUser', JSON.stringify(this.user));
        });
    }

    logout(): void 
    {
        localStorage.removeItem('loggedinUser');
    }

    register(user_info: any) 
    {
        let url = host + registerPath + slash;
        return this.http.post(url, user_info);
    }
}
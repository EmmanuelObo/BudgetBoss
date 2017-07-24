import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService{
    constructor(private http: Http){}

    login(username: string, password: string)
    {
        this.http.post('http://127.0.0.1:8000/api/v1/user/',JSON.stringify({username, password})).map((response: Response) => {
            let user = response.json();
            if(user && user.token)
                {
                    localStorage.setItem('loggedinUser', JSON.stringify(user));
                }
            return user;
        });
    }

    logout(): void 
    {
        localStorage.removeItem('loggedinUser');
    }
}
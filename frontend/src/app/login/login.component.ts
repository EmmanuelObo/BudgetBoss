import { Component } from '@angular/core';
import { User } from '../_models/index';
import { AuthenticationService } from '../_services/index';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent{
    model: any = {};
    isAuthenticated: boolean = false; 
    submitted:boolean = false;
    user: any;

    constructor(private auth: AuthenticationService, private router: Router){}

    login()
    {
        this.auth.login(this.model.username,this.model.password)
        .subscribe(
            data => {
               this.isAuthenticated = true;
               this.router.navigate(['/home']);
            },
            err => console.log(err.text()),
            () => console.log('Request Complete'));
    }

    onSubmit()
    {
        this.submitted = true;
    }
}
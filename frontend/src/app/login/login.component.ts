import { Component } from '@angular/core';
import { User, List, Category } from '../_models/index';
import { AuthenticationService, ItemService } from '../_services/index';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { homePath } from '../_constants/index';
import { fadeInAnimation, slideFromTop } from '../_animations/index';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    animations: [slideFromTop],
    host: {'[@slideFromTop]': ''}
})

export class LoginComponent{
    model: any = {};
    isAuthenticated: boolean = false; 
    submitted: boolean = false;
    user: User;
    lists: List[] = [];

    constructor(private auth: AuthenticationService, private router: Router){}

    login()
    {
        this.auth.login(this.model.username,this.model.password)
        .subscribe(
            data => {
                this.user = JSON.parse(localStorage.getItem('loggedinUser'));
                this.isAuthenticated = true;
                this.router.navigate([homePath]);
            },
            error => console.log(error),
            () => console.log('Request Complete'));
    }

    onSubmit()
    {
        this.submitted = true;
    }
}
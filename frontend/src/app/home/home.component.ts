import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent{
    constructor(private authService: AuthenticationService, 
        private router: Router){}

    title:string = 'Home Central';

    logout()
    {
        this.authService.logout();
    }
}
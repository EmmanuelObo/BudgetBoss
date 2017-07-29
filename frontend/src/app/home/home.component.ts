import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';
import { loginPath } from '../_constants/index';
import { Priority } from '../_constants/index';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit{
    constructor(private authService: AuthenticationService, 
        private router: Router){}

    title: string = 'Home Central';
    test: string = 'HIGH';
    highest: Priority = Priority.HIGH;
    medium: Priority = Priority.MEDIUM;
    lowest: Priority = Priority.LOW;

    logout()
    {
        this.authService.logout();
        this.router.navigate([loginPath]);
    }

    ngOnInit()
    {
        console.log("1st Priority: " + this.highest);
        console.log("2nd Priority: " + this.medium);
        console.log("3rd Priority: " + this.lowest);
    }
}
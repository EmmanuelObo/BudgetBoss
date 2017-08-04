import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ItemService } from '../_services/index';
import { Item } from '../_models/index';
import { Router } from '@angular/router';
import { loginPath } from '../_constants/index';
import { Priority } from '../_constants/index';


@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit{
    constructor(private authService: AuthenticationService, 
        private router: Router,
        private itemService: ItemService){}




    logout()
    {
        this.authService.logout();
        this.router.navigate([loginPath]);
    }

    ngOnInit()
    {
     
    }
}
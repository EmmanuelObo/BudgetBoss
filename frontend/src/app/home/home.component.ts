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

    title: string = 'Home Central';
    items: Item[];
    item: Item;
    mockItem: Item = new Item(102, 'Mock Item', 23.54,Priority.HIGH);


    logout()
    {
        this.authService.logout();
        this.router.navigate([loginPath]);
    }

    ngOnInit()
    {
        this.items = this.itemService.getAll();
        console.log(this.items);        
    }
}
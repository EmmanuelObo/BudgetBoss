import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ItemService, ListService } from '../_services/index';
import { List, Item, Category } from '../_models/index';
import { Priority } from "../_constants/index";

@Component({
    selector: 'list-details',
    templateUrl: 'listdetails.component.html'
})

export class ListDetailsComponent{
    

    //Using Mock Data for now to test view
    id: string;
    list: List;
    items: Item[] = [];
    constructor(private route: ActivatedRoute, private listService: ListService, private itemService: ItemService){}

    ngOnInit()
    {
        this.route.params.subscribe((param: Params)=>{ this.id = param['id'] })
        this.listService.get(this.id).subscribe(data=>{this.list = <List>data})
    }
}
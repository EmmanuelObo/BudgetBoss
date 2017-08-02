import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ItemService } from '../_services/index';
import { List, Item, Category } from '../_models/index';
import { Priority } from "../_constants/index";

@Component({
    selector: 'list-details',
    templateUrl: 'listdetails.component.html'
})

export class ListDetailsComponent{
    constructor(private route: ActivatedRoute, private itemService: ItemService){}

    //Using Mock Data for now to test view
    id: string;

    firstItem: Item = new Item(2, 'Desk', 70, Priority.HIGH);
    secondItem: Item = new Item(3, 'Desk Chair', 70, Priority.HIGH);
    thirdItem: Item = new Item(4, 'Lamp', 70, Priority.MEDIUM);
    fourthItem: Item = new Item(5, 'Monitor', 70, Priority.HIGH);
    fifthItem: Item = new Item(6, 'Keyboard', 70, Priority.LOW);
    
    items: Item[] = [this.firstItem,this.secondItem,this.thirdItem,this.fourthItem,this.fifthItem]
    currList: List = new List(99, 'Office Supplies', 101.45, '2017-7-30', this.items, 350, 5, new Category(21, 'Home Office', [1, 'manny'], 350, 1));

    ngOnInit()
    {
        this.route.params.subscribe((params: Params)=>{
            console.log('ID: ' + params['id']);
            this.id = params['id'];
            console.log(this.itemService.get(+this.id));
        })
    }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ItemService, ListService } from '../_services/index';
import { List, Item, Category } from '../_models/index';
import { Priority } from "../_constants/index";
import { fadeInAnimation } from "../_animations/index";

@Component({
    selector: 'list-details',
    templateUrl: 'listdetails.component.html',
    animations: [fadeInAnimation],
    host: { '[@fadeInAnimation]': '' }
})

export class ListDetailsComponent{
    

    //Using Mock Data for now to test view
    id: string;
    list: List;
    items: Item[] = [];
    priorityStyle: string = "border-left-color: #e41e1b;border-left-style: solid; border-left-width: 9px;";
    showNotes:boolean = true;
    constructor(private route: ActivatedRoute, private listService: ListService, private itemService: ItemService){}

    ngOnInit()
    {
        this.route.params.subscribe((param: Params)=>{ this.id = param['id'] });
        this.listService.get(this.id).subscribe(data=>
                {
                    this.list = <List>data; 
                    this.list['items'].map((x)=>{Math.round(x.cost * 100)/100})
                    this.list['items'] = this.list['items'].sort((a,b)=>
                    {
                        let first = this.itemService.getPriority(a.priority.toString())
                        let second = this.itemService.getPriority(b.priority.toString())
                        return second-first
                    })
                });
    }

    deleteItem(id: string)
    {
        this.itemService.delete(id).subscribe(()=>{this.loadItems()});
    }

    loadItems()
    {
        this.listService.get(this.id).subscribe(data=>
            {
                this.list = <List>data;
                this.list['items'] = this.list['items'].sort((a,b)=>
                {
                    let first = this.itemService.getPriority(a.priority.toString())
                    let second = this.itemService.getPriority(b.priority.toString())
                    return second-first
                })
            })
    }

    goBack()
    {
        window.history.back();
    }

    setStyling(priority)
    {
        if(priority == 'HIGH')
            {
                return "#e41e1b";
            }

        if(priority == 'MEDIUM')
            {
                return "#f9f507";
            }

        if(priority == 'LOW')
            {
                return "#d4d4d4";
            }
    }

    toggleNotes()
    {
        this.showNotes = this.showNotes ? false : true;
    }
}
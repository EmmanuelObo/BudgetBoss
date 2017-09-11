import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ItemService, ListService } from '../_services/index';
import { List, Item, Category } from '../_models/index';
import { Priority, listExport, host } from "../_constants/index";
import { slideFromTop } from "../_animations/index";
import { trigger, animate, style, state, transition } from '@angular/animations';

@Component({
    selector: 'list-details',
    templateUrl: 'listdetails.component.html',
    animations: [slideFromTop,
        trigger('createItemAnimation', [
            state('closed', style({
                opacity: 0,
                display: 'none',
                width: "60%",
            })),
            state('opened', style({
                opacity: 1,
                display: 'block',
                width: "85%",
            })),
            transition('closed <=> opened', animate('400ms ease-in'))
        ]),
    ],
    host: { '[@slideFromTop]': '' },
    styleUrls: ['listdetails.component.css']
})

export class ListDetailsComponent{
    

    id: string;
    list: List;
    items: Item[] = [];
    priorityStyle: string = "border-left-color: #e41e1b;border-left-style: solid; border-left-width: 9px;";
    showNotes:boolean = true;
    hasNewItem:boolean = false;
    state:string = 'closed';

    extensions = [{text: 'txt', value: 'txt'},{text: 'xls', value: 'csv'},{text: 'pdf', value:'pdf'}]

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

    loadItems = function()
    {
        this.listService.get(this.id).subscribe(data=>
            {
                console.log("loadItems function called")
                this.list = <List>data;
                this.list['items'] = this.list['items'].sort((a,b)=>
                {
                    let first = this.itemService.getPriority(a.priority.toString())
                    let second = this.itemService.getPriority(b.priority.toString())
                    return second-first
                })
            })
    }

    onListLoad()
    {
        this.loadItems();
    }

    export(ext: string)
    {
        this.listService.export(this.id, ext);
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

    toggleNewItem()
    {
        this.hasNewItem = this.hasNewItem ? false : true;
    }

    toggleState()
    {
        this.state = (this.state === 'closed' ? 'opened' : 'closed');
        console.log(this.state)
    }
}
import { Component } from '@angular/core';
import { Item, List } from '../_models/index';
import { ItemService, ListService } from '../_services/index';
import { slash, host, itemURI, listURI, Priority } from '../_constants/index';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'create-item',
    templateUrl: 'createitem.component.html',
    styleUrls: ['createitem.component.css']
})


export class CreateItemComponent{
    id:number;
    priorities: string[] = ["HIGH", "MEDIUM", "LOW"]


    constructor(private route: ActivatedRoute, private itemService: ItemService)
    {
        route.params.subscribe((param: Params)=>{this.id = param['id']})
        console.log(this.id)
    }

    hasNotes:boolean = false;
    notesBtnTxt:string = "Add Notes";
    model:any = {};
    
    createItem()
    {
        this.model['list'] = host + listURI + this.id + slash;
        this.itemService.create(this.model).subscribe(data=>{console.log('Item: ' + this.model['name'] + ' created.')}, error=>{console.log(error)})
        location.reload();
        console.log(this.model);
    }

    toggleNotes()
    {
        this.hasNotes = this.hasNotes ? false:true;

        if(!this.hasNotes) {   this.notesBtnTxt = "Add Notes";     }
        else {   this.notesBtnTxt = "Remove Notes"    }
    }

}
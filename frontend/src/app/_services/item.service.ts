import { Injectable } from "@angular/core";
import { Item } from '../_models/index';
import { Priority, host, slash, itemURI } from "../_constants/index";
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService{
    constructor(private http: HttpClient){}
    url: string = host + itemURI;
    item: Item;

    get(id: number):Item
    {
        this.http.get(this.url + id + slash).subscribe(data=>{
            this.item = new Item(data['id'],
                                 data['name'],
                                 data['cost'],
                                 data['priority']);
        },
        error=>{
            console.error(error);
            return null;
        })
        return this.item;
    }

    getAll():Item[]
    {
        let data: any = {}
        var items: Item[] = [];
        this.http.get(this.url).subscribe(response=>{
            data = response['objects']
            data.map(item=>{
                items.push(new Item(item.id,
                                    item.name,
                                    item.cost,
                                    item.priority))
            })
        }).unsubscribe();
        return items
    }

    delete(id: number): boolean
    {
        this.http.delete(this.url + id + slash).subscribe(data=>{
            return true;
        },
        error=>{
            console.error(error);
            return false;
        })
        return;
    }

    update(id: number, 
        name?: string, 
        cost?: number, 
        note?: string,
        priority?: Priority)
    {

    }

    getPriority(priority: string): Priority
    {
        if(priority == "HIGH")
            return Priority.HIGH

        if(priority == "MEDIUM")
            return Priority.MEDIUM
        
        return Priority.LOW
    } 
}
import { Injectable } from "@angular/core";
import { Item } from '../_models/index';
import { Priority, host, slash, itemURI } from "../_constants/index";
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable()
export class ItemService{
    constructor(private http: HttpClient){}

    get(id)
    {
        return this.http.get(host + itemURI + id + slash);
    }

    getAll()
    {
        this.http.get(host + itemURI);
    }

    delete(id)
    {
        this.http.delete(host + itemURI + id + slash);
    }

    update(data)
    {
        return this.http.put(host + itemURI + data['id'] + slash, data);
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
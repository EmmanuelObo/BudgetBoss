import { Injectable } from '@angular/core';
import { List, Category, Item } from '../_models';
import { HttpClient } from '@angular/common/http';
import {ItemService } from '../_services/index';
import { host, listURI, categoryURI, userURI, slash } from '../_constants/index';


@Injectable()
export class ListService {
    constructor(private http: HttpClient, private itemService: ItemService) { }
    create(body:Object) 
    {
        //body = JSON.stringify(body)
        let url:string = host + listURI; 
        this.http.post(url, body).subscribe(data=>{
            console.log('New List: ' + body["title"] + ' has been created.');
        },
        error=>{
            console.log(body);
        });
    }

    destroy(id: string) 
    {
        let url: string = host + listURI + id;
        this.http.delete(url, data=>{
            console.log('List deleted')
        })
    }

    update(title: string,
        limit: number, currList: List):List 
    {
        //Later change to HTTP Put Method
        //to create the new list
        currList.title = title || currList.title;
        currList.limit = limit || null;
        return currList;
    }

    get(id)
    {
        let url:string = host + listURI + id + slash;
        return this.http.get(url);
    }

    convert():List[]
    {
        let lists: List[];

        lists.forEach(element=>{

        })

        return lists;
    }

    getAll():void 
    {
        this.http.get('http://127.0.0.1:8000/api/v1/list/').subscribe(data=>{
        let response = JSON.stringify(data['objects']);
        console.log(response);
        });
    }

}
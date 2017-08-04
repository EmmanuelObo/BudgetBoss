import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User, List, Item, Category } from "../_models/index";
import { ItemService } from '../_services/index';
import { host, userURI, Priority } from '../_constants/index';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService{
    constructor(private http: Http){}

    headers = new Headers();
    user: User;

    login(username: string, password: string)
    {
        this.headers.set('Content-Type', "application/x-www-form-urlencoded");
        this.headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

        let url:string = host + userURI;

        return this.http.get(url, {headers: this.headers})
        .map((response: Response)=>{
            this.user = response.json()['objects'][0];
            console.log(this.user);
            localStorage.setItem('loggedinUser', JSON.stringify(this.user));
        });
    }

    convertItems(items)
    {
        let allItems: Item[] = [];
        items.forEach(element=>
        {
            // allItems.push(new Item(element['id'], 
            //                          element['name'], 
            //                          element['cost'], 
            //                          this.getPriority(element['priority'])))
        })
        return allItems;
    }

    convertLists(lists)
    {
        let allLists: List[] = [];
        lists.forEach(element=>
        {
            allLists.push(new List(element['id'],
                                        element['title'],
                                        element['limit'] ? element['limit'] : 0,
                                        element['date_created'],
                                        element['items'].length > 0 ? this.convertItems(element['items']): [],
                                        element['total'],
                                        element['item_count'],
                                        this.convertToCategory(element['category'])))
        })
        return allLists;
    }

    convertCategories(categories)
    {
        let allCategories: Category[] = [];
        categories.forEach(element=>
        {
            allCategories.push(new Category(element['id'],
                                              element['title'],
                                              element['user'],
                                              element['total'],
                                              element['list_count']))
        })
        return allCategories;
    }

    convertToCategory(category)
    {
        let current: Category;
        current = new Category(category['id'],
                                     category['title'],
                                     category['user'],
                                     category['total'],
                                     category['list_count']);
        return current;
    }

    //TODO: Remove this function and use itemService.getPriority instead
    getPriority(priority: string): Priority
    {
        if(priority == "HIGH")
            return Priority.HIGH

        if(priority == "MEDIUM")
            return Priority.MEDIUM
        
        return Priority.LOW
    } 

    logout(): void 
    {
        localStorage.removeItem('loggedinUser');
    }
}
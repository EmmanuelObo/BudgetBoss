import { Injectable } from '@angular/core';
import { List } from '../_models/list';
import { HttpClient } from '@angular/common/http';
import { host, listURI, categoryURI, userURI } from '../_constants/index';


@Injectable()
export class ListService {
    constructor(private http: HttpClient) { }
    create(title: string, limit:string) 
    {

        let url:string = host + listURI; 
        let data:string = JSON.stringify({"category": "/" + categoryURI + "4/",
            "limit": (limit == '' ? '': limit),
            "title": title,
            "user": userURI});
        let body:JSON = JSON.parse(data);
        this.http.post(url, body).subscribe(data=>{
            console.log('New List: ' + title + ' has been created.');
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

    get(id:string):void
    {
        let url:string = 'http://127.0.0.1:8000/api/v1/list/'+id+'/';
        this.http.get(url).subscribe(data=>{
            let response = data;
            let body:string = 'List ID: ' + response['id'] + '\n'
                      +  'List Title: ' + response['title'] + '\n'
                      + 'List Limit: ' + 
                      (response['limit'] == null ? 'N/A' : '$' + response['limit']);
            console.log(body);
        });
    }

    getAll():void 
    {
        this.http.get('http://127.0.0.1:8000/api/v1/list/').subscribe(data=>{
        let response = JSON.stringify(data['objects']);
        console.log(response);
        });
    }

}
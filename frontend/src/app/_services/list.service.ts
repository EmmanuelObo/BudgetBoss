import { Injectable } from '@angular/core';
import { List, Category, Item } from '../_models';
import { HttpClient } from '@angular/common/http';
import {ItemService } from '../_services/index';
import { host, listURI, listExport, categoryURI, userURI, slash, userid_filter } from '../_constants/index';


@Injectable()
export class ListService {
    constructor(private http: HttpClient) { }

    create(data) 
    {
        return this.http.post(host + listURI + data['id'] + slash, data);
    }

    delete(id) 
    {
        return this.http.delete(host + listURI + id + slash);
    }

    update(data) 
    {
        return this.http.put(host + listURI + data['id'] + slash, data);
    }

    get(id)
    {
        return this.http.get(host + listURI + id + slash);
    }

    export(id, ext)
    {
         window.location.href = host + listExport + ext + slash + id;
    }

    loadAll(_userid) 
    {
        return this.http.get(host + listURI + userid_filter + _userid);
    }

}
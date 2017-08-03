import { Injectable } from '@angular/core';
import { List } from '../_models/list';
import { HttpClient } from '@angular/common/http';
import { host, listURI, categoryURI, userURI, slash } from '../_constants/index';

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient){}

    get(id)
    {
        let url: string = host + categoryURI + id + slash;
        return this.http.get(url);
    }


}
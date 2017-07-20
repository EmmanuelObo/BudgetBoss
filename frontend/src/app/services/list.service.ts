import {Injectable} from '@angular/core';
import {List} from '../list/list';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class ListService{
    create(title:string)
    {
        //Later change to HTTP Post Method
        //to create the new list
        return new List(title);
    }

    destroy()
    {

    }

    update(title:string,
           limit:number, currList:List)
    {
        //Later change to HTTP Put Method
        //to create the new list
        currList.title = title;
        currList.limit = limit || null;
        return currList;
    }

    get()
    {

    }

    getAll()
    {

    }

}
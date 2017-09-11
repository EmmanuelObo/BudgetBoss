import { Component, OnInit } from '@angular/core';
import { ListService } from '../_services/index';
import { List, User } from '../_models/index';
import { fadeInAnimation, slideFromTop } from "../_animations/index";
 
@Component({
    selector: 'list',
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css'],
    // animations: [slideFromTop],
    // host: { '[@slideFromTop]': '' }
})

export class ListComponent implements OnInit{

    lists:List[] = [];
    user:User;
    routeList: string = '/list/';
    
    constructor(private listService: ListService)
    {
        this.user = JSON.parse(localStorage.getItem('loggedinUser'));
    }

    ngOnInit()
    {
        this.loadUsersLists();
    }

    deleteList(id:string)
    {
        this.listService.delete(id).subscribe(()=>{ this.loadUsersLists() });
    }

    loadUsersLists()
    {
        this.listService.loadAll(this.user['id']).subscribe(data=>{this.lists = data['objects']});
    }
}
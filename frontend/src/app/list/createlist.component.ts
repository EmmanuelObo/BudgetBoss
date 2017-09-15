import { Component, Input } from '@angular/core';
import { categoryURI, slash } from '../_constants/index';
import { ListService } from '../_services/index';

@Component({
    selector: 'create-list',
    templateUrl: 'createlist.component.html'
})

export class CreateListComponent{
    constructor(private listService: ListService){}

    @Input() user;

    model: any = {"items":[], "user": "/api/v1/user/1/"}
    hasLimit: boolean = false;
    limitBtnText: string = 'Add Limit'
    limitBtnStyle: string = 'btn btn-primary'

    toggleLimit()
    {
        if(this.hasLimit)
            {
                this.hasLimit = false;
                this.limitBtnText = 'Add Limit';
                this.limitBtnStyle = 'btn btn-primary';
            }
        else
        {
            this.hasLimit = true;
            this.limitBtnText = 'Remove Limit';
            this.limitBtnStyle = 'btn btn-danger';
        }
    }

    createList()
    {
        this.model['category'] = slash + categoryURI + this.model['category'] + slash;
        console.log(this.model);
        this.listService.create(this.model).subscribe(data=>{},
        error=>{console.info(error)});
    }

    
}
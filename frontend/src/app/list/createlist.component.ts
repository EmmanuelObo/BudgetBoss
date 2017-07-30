import { Component } from '@angular/core';

@Component({
    selector: 'create-list',
    templateUrl: 'createlist.component.html'
})

export class CreateListComponent{
    model: any = {}
    categories: string[] = ["Groceries", "Bills", "Loans", "Home", "Car"]
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
}
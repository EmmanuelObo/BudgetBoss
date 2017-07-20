import { Item } from '../item/item';
import { Category } from '../category/category';

export class List {
    constructor(private listtitle:string){}
    id: number;
    title: string = this.listtitle;
    limit: number;
    dateCreated: string;
    items: Array<Item>;
    category: Category;
}
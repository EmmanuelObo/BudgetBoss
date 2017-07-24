import { Item } from '../_models/item';
import { Category } from '../_models/category';

export class List {
    constructor(private listtitle:string){}
    id: number;
    title: string = this.listtitle;
    limit: number;
    dateCreated: string;
    items: Array<Item>;
    category: Category;
}
import { Item, Category } from '../_models/index';

export class List {
    constructor(
    public id: number,
    public title: string,
    public limit: number,
    public date_created: string,
    public items: Item[],
    public total: number,
    public item_count: number,
    public category: Category){}
}
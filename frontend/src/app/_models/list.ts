import { Item, Category } from '../_models/index';

export class List {
    constructor(
    public id: number,
    public title: string,
    public limit: number,
    public dateCreated: string,
    public items: Array<Item>,
    public total: number,
    public itemCount: number,
    public category: Category){}
}
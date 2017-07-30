import { Priority } from '../_constants/index';

export class Item {
    constructor(
    public id: number,
    public name: string,
    public cost: number,
    public priority: Priority){}
}
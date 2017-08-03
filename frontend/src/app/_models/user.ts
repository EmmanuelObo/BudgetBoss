import { Category, List } from "./index";

export class User{

    constructor(public id: number,
    public username: string,
    public lists: List[],
    public categories: Category[],
    public email?: string,
    public firstname?: string,
    public lastname?: string){}
}
export class Category{
    constructor(
        public id: number,
        public title: string,
        public user: string,
        public total?: number,
        public listCount?: number
    ){}
}
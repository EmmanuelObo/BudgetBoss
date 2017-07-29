export class Category{
    constructor(
        public id: number,
        public title: string,
        public owner: [number,string],
        public total: number,
        public listCount: number
    ){}
}
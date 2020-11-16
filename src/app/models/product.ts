import { Company } from './company';
export class Product{
    constructor(
        public code:string,
        public name:string,
        public details:string,
        public image:string,
        public price:number,
        public company:Company
    ){}
}
import { Category } from "./Category.model";

export class SubCategory {
    id!: number;
    name!: string;
    categoryId!: Category;
    image!: string; 
}

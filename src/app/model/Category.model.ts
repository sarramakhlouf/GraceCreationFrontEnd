import { SubCategory } from "./SubCategory.model";

export class Category {
    id!: number;
    name!: string;
    subCategoryId!: SubCategory;
}

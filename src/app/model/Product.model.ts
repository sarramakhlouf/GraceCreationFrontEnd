import { SubCategory } from "./SubCategory.model";

export class Product {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    subCategoryId!: SubCategory;
    image!: string;
    available!: boolean;
    feaured!: boolean;
    new!: boolean;
    promotion!: boolean;
    promo_price!: number;
    pack!: boolean;
    pack_id!: number;
}

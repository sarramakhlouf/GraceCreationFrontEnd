export class Product {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    subCategoryId!: number;
    image!: string;
    available!: boolean;
    featured!: boolean;
    new!: boolean;
    promotion!: boolean;
    promo_price!: number;
    pack!: boolean;
    pack_id!: number;
    category?: {
        id: number;
        name: string;
      };
    filter_id?: number;
    category_id?: number;
    category_name?: string;
    subcategory_name?: string;
    filter_name?: string;
    
}

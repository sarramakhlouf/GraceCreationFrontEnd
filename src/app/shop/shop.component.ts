import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/Product.model';
import { CategoryService } from '../services/category.service';
import { Options } from '@angular-slider/ngx-slider';
import { randomUUID } from 'crypto';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  standalone: false,
})
export class ShopComponent {
  product: Product | null = null;
  products!: Product[];
  filters: any[] = [];
  categories: any[] = [];
  baseUrl: string = 'http://localhost:8000/storage/';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private filterService: FilterService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadFilteredProducts();
    this.loadFilters();
    this.route.params.subscribe(params => {
      const categoryId = params['categoryId'];
      const subCategoryId = params['subCategoryId'];
      console.log(categoryId,subCategoryId);
      if (categoryId && !subCategoryId) {
        this.getProductsByCategory(categoryId);
      } else if (subCategoryId) {
        this.getProductsBySubCategory(subCategoryId);
      }
    });
  }

  loadProducts(): void {
    this.productService.listeProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  getProductsByCategory(categoryId: number): void {
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (data) => {
        this.products = data;
      },
    });
  }

  getProductsBySubCategory(subCategoryId: number): void {
    this.productService.getProductsBySubCategory(subCategoryId).subscribe({
      next: (data) => {
        this.products = data;
      },
    });
  }

  loadFilteredProducts(): void {
    this.productService.getFiltredProducts().subscribe(
      (data) => {
        this.products = data;
      },
    );
  }
  

  loadFilters(): void {
    this.filterService.getFiltersForColor().subscribe(
      (data) => {
        this.filters = data;
      },
    );
  }
}

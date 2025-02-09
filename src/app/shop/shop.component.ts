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
  currentPage!: number;
  lastPage!: number;
  filters: any[] = [];
  categories: any[] = [];
  /*selectedCategories: number[] = [];
  selectedFilters: number[] = [];*/
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
    //this.loadFilteredProducts();
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

  loadProducts(page: number = 1): void {
    this.productService.listeProducts(page).subscribe((data) => {
      console.log("Loaded products:", data);
      this.products = data.data; // On prend uniquement les produits
      this.currentPage = data.current_page;
      this.lastPage = data.last_page;
    });
  }
  

  changePage(page: number): void {
    if (page >= 1 && page <= this.lastPage) {
      this.currentPage = page;
      this.loadProducts();
    }
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

  loadFilters(): void {
    this.filterService.getFiltersForColor().subscribe((data) => {
        this.filters = data;
      },
    );
  }


  /*loadFilteredProducts(): void {
    this.productService.getFilteredProducts(this.selectedCategories, this.selectedFilters)
      .subscribe((data) => {
        this.products = data;
      });
  }
  onCategoryChange(categoryId: number, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
    this.loadProducts();
  }

  onFilterChange(filterId: number, event: any) {
    if (event.target.checked) {
      this.selectedFilters.push(filterId);
    } else {
      this.selectedFilters = this.selectedFilters.filter(id => id !== filterId);
    }
    this.loadProducts();
  }*/


}




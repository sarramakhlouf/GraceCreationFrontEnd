import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/Product.model';
import { CategoryService } from '../services/category.service';
import { Options } from '@angular-slider/ngx-slider';
import { randomUUID } from 'crypto';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../services/filter.service';
import { HttpClient } from '@angular/common/http';

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
  searchQuery: string | null = null;
  colors: any[] = [];
  priceRanges: any[] = [];
  /*selectedCategories: number[] = [];
  selectedFilters: number[] = [];*/
  baseUrl: string = 'http://localhost:8000/storage/';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private filterService: FilterService,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.getFilters();
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
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || null;
      if (this.searchQuery) {
        this.fetchProducts();
      } else {
        this.fetchAllProducts();
      }
    });
  }

  loadProducts(): void {
    this.productService.listeProducts().subscribe((data) => {
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
    alert("Votre commande est ajoutée au panier avec succès !");
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

  

  fetchProducts() {
    this.http.get(`http://localhost:8000/api/products/search?query=${encodeURIComponent(this.searchQuery!)}`)
      .subscribe(
        (data: any) => {
          this.products = data;
        },
        error => {
          this.products = [];
          console.error('Erreur lors de la récupération des produits :', error);
        }
      );
  }

  fetchAllProducts() {
    this.http.get(`http://localhost:8000/api/products`)
      .subscribe(
        (data: any) => {
          this.products = data;
        },
        error => {
          console.error('Erreur lors de la récupération des produits :', error);
        }
      );
  }

  getFilters() {
    this.filterService.getFilters().subscribe(response => {
      this.categories = response.categories;
      this.colors = response.colors;
      this.priceRanges = response.priceRanges;
    }, error => {
      console.error('Erreur lors du chargement des filtres:', error);
    });
  }



}




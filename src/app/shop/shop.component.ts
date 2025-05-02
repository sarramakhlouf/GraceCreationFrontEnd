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
  products: Product[] = [];
  allProducts: Product[] = []; 

  filters: any[] = [];
  categories: any[] = [];
  colors: any[] = [];
  priceRanges: any[] = [];

  selectedCategories: number[] = [];
  selectedColors: number[] = [];
  selectedPriceRange: { min: number, max: number } | null = null;

  searchQuery: string | null = null;

  currentPage!: number;
  lastPage!: number;

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

    this.productService.getProductsWithDetails().subscribe(data => {
      this.products = data;
      this.allProducts = data;
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
        this.allProducts = data;
      },
    });
  }

  getProductsBySubCategory(subCategoryId: number): void {
    this.productService.getProductsBySubCategory(subCategoryId).subscribe({
      next: (data) => {
        this.products = data;
        this.allProducts = data;
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

  applyFilters() {
    this.products = this.allProducts.filter(product => {
      const categoryMatch =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(Number(product.category_id));
  
      const colorMatch =
        this.selectedColors.length === 0 ||
        this.selectedColors.includes(Number(product.filter_id));
  
      const priceMatch = !this.selectedPriceRange || (
        product.price >= this.selectedPriceRange.min &&
        product.price <= this.selectedPriceRange.max
      );

      console.log('Filter Debug:', {
        selectedCategories: this.selectedCategories,
        productCategory: product.category_id,
        categoryMatch,
        colorMatch,
        priceMatch
      });
  
      return categoryMatch && colorMatch && priceMatch;
    });
  }

  onCategoryChange(categoryId: number, event: any): void {
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
    this.applyFilters();
  }
  
  onColorChange(colorId: number, event: any): void {
    if (event.target.checked) {
      this.selectedColors.push(colorId);
    } else {
      this.selectedColors = this.selectedColors.filter(id => id !== colorId);
    }
    this.applyFilters();
  }
  
  onPriceChange(range: { min: number, max: number } | null): void {
    this.selectedPriceRange = range;
    this.applyFilters();
  }
  




}




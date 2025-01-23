import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/Product.model';
import { CategoryService } from '../services/category.service';
import { Options } from '@angular-slider/ngx-slider';
import { randomUUID } from 'crypto';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  standalone: false,
})
export class ShopComponent {
  product: Product | null = null;
  products!: Product[];
  isLoading = true;
  paginatedProducts: any[] = []; // Produits affichés dans la page actuelle
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 9; // Nombre d'éléments par page
  totalProducts: number = 0; // Nombre total de produits
  categories: any[] = [];


  filteredProducts: any[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.route.params.subscribe((params) => {
      const subCategoryId = params['id']; // Récupère l'ID de la sous-catégorie depuis l'URL
      if (subCategoryId) {
        this.loadProductsBySubCategory(subCategoryId);
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.listeProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
    this.totalProducts = this.products.length;
    this.updatePaginatedProducts();
    this.isLoading = false;
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // Ajouter un produit au panier
  addToCart(product: any) {
    this.cartService.addToCart(product); // Utiliser le service pour ajouter au panier
    alert(`${product.name} a été ajouté au panier.`);
  }

  loadProductsBySubCategory(subCategoryId: number): void {
    this.isLoading = true;
    this.productService.getProductsBySubCategory(subCategoryId).subscribe(
      (data) => {
        this.products = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching products', error);
        this.isLoading = false;
      }
    );
  }
  // Mettre à jour les produits affichés en fonction de la page actuelle
  updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  // Changer de page
  changePage(page: number): void {
    if (page > 0 && page <= Math.ceil(this.totalProducts / this.itemsPerPage)) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }
  


}

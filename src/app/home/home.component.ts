import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/Product.model';
import { CartService } from '../services/cart.service';
import { SlideService } from '../services/slide.service';
import { Category } from '../model/Category.model';
import { SubCategory } from '../model/SubCategory.model';
import { SubcategoryService } from '../services/subcategory.service';
import { Slide } from '../model/Slide.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  products!: Product[];
  slides!: Slide[];
  categories!: Category[];
  subcategories!: SubCategory[];
  filteredSlides: any[] = [];
  baseUrl: string = 'http://localhost:8000/storage/';

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private slideService: SlideService,
    private subcategoryService: SubcategoryService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadSlides();
    this.loadSubCategories();
  }

  loadProducts(): void {
    this.productService.listeProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert("Votre commande est ajoutée au panier avec succès !");
  }

  loadSlides() {
    this.slideService.getSlides().subscribe((data) => {
      this.slides = data;
      this.filteredSlides = this.slides.filter(slide => !slide.logo && !slide.instagram && !slide.navbar); 

    });
  }

  loadSubCategories(){
    this.subcategoryService.getSubCategories().subscribe((data) => {
      this.subcategories = data;
    });
  }

  getSubCategoryChunks(): SubCategory[][] {
    const chunkSize = 5; // Nombre de catégories par slide
    const chunks: SubCategory[][] = [];
    
    for (let i = 0; i < this.subcategories.length; i += chunkSize) {
      chunks.push(this.subcategories.slice(i, i + chunkSize));
    }
  
    return chunks;
  }
  
}
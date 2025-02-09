import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { SubcategoryService } from './services/subcategory.service';
import { Category } from './model/Category.model';
import { SubCategory } from './model/SubCategory.model';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';
import { SearchService } from './services/search.service';
import { HttpClient } from '@angular/common/http';
import { Slide } from './model/Slide.model';
import { SlideService } from './services/slide.service';
import { CartService } from './services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'graceCreations';
  slides!: Slide[];
  logoSlide: any | null = null;
  instagramSlide: any | null = null;
  categories: any[] = [];
  subcategories: { [key: number]: SubCategory[] } = {};
  filteredCategories = [...this.categories];
  searchQuery = ' ';
  searchResults: any[] = [];
  cartItemCount: number = 0;
  private cartSubscription!: Subscription;
  baseUrl: string = 'http://localhost:8000/storage/';


  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private slideService: SlideService,
    private cartService: CartService,
    private searchService: SearchService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadCategoriesAndSubcategories();
    this.loadSlides();
    this.cartItemCount = this.cartService.getCartCount(); 
    this.cartSubscription = this.cartService.cartUpdated.subscribe(() => {
      this.cartItemCount = this.cartService.getCartCount();
    });
  }
  loadCategoriesAndSubcategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.categories.forEach((category) => {
        this.subcategoryService
          .getSubcategoriesByCategory(category.id)
          .subscribe((subcategories: SubCategory[]) => {
            this.subcategories[category.id] = subcategories;
          });
      });
    });
  }

  loadSlides() {
    this.slideService.getSlides().subscribe((data) => {
      this.slides = data;
      this.logoSlide = this.slides.find(slide => slide.logo == true);
      this.instagramSlide = this.slides.filter(slide => Boolean(slide.instagram));
    });
  }

  onInputChange() {
    console.log("Valeur de l'input :", this.searchQuery);
  }

  onSearch(event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page

    console.log("Texte recherché :", this.searchQuery);
    if (!this.searchQuery.trim()) {
      console.warn("Le champ de recherche est vide !");
      return;
    }

    this.http.get(`http://localhost:8000/api/products/search?name=${encodeURIComponent(this.searchQuery)}`)
      .subscribe(
        (response) => {
          console.log("Résultats :", response);
        },
        (error) => {
          console.error("Erreur lors de la recherche :", error);
        }
      );
  }

}

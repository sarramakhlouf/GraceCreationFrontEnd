import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { SubcategoryService } from './services/subcategory.service';
import { Category } from './model/Category.model';
import { SubCategory } from './model/SubCategory.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './services/product.service';
import { SearchService } from './services/search.service';
import { HttpClient } from '@angular/common/http';
import { Slide } from './model/Slide.model';
import { SlideService } from './services/slide.service';
import { CartService } from './services/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'graceCreations';
  slides!: Slide[];
  products: any[] = [];
  logoSlide: any | null = null;
  navbarSlide: any | null = null;
  instagramSlide: any | null = null;
  categories: any[] = [];
  subcategories: { [key: number]: SubCategory[] } = {};
  isSearchActive = false;
  searchText = '';
  filteredCategories = [...this.categories];
  cartItemCount: number = 0;
  private cartSubscription!: Subscription;
  showLayout: boolean = true;
  showIgLayout: boolean = true;
  baseUrl: string = 'http://localhost:8000/storage/';


  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private slideService: SlideService,
    private cartService: CartService,
    public authService: AuthService,
    private router: Router,
  ) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLayout = !(event.url.includes('/login') || event.url.includes('/signup'));
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showIgLayout = !(event.url.includes('/profile'));
      }
    });
  }

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
      this.navbarSlide = this.slides.find(slide => slide.navbar == true);
    });
  }
  
  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  hideSearch() {
    if (this.searchText.trim()) {
      this.router.navigate(['/Shop'], { queryParams: { search: this.searchText } });
    }
    this.isSearchActive = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}

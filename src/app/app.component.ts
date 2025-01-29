import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { SubcategoryService } from './services/subcategory.service';
import { Category } from './model/Category.model';
import { SubCategory } from './model/SubCategory.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent implements OnInit{
  title = 'graceCreations';
  searchTerm: string = '';
  categories: any[] = [];
  subcategories: { [key: number]: SubCategory[] } = {};
  filteredCategories = [...this.categories]; // Par défaut, toutes les catégories

  constructor(
    private categoryService: CategoryService, 
    private subcategoryService: SubcategoryService,
    private router: Router
    ) {}

  ngOnInit(): void{
    this.loadCategoriesAndSubcategories();// Charger les catégories et sous-catégories
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
  onSearch(): void {
    if (this.searchTerm.trim()) {
      // Redirige vers la page de résultats ou traite la recherche
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
    }
  }
}

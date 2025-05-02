import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { SubcategoryService } from '../services/subcategory.service';

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  standalone: false,
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: { label: string; url?: string }[] = [];
  categories: Category[] = [];
  subcategories: { [key: number]: SubCategory[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,  
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService
  ) {}

  ngOnInit() {
    this.loadCategoriesAndSubcategories();
  
    this.route.params.subscribe(params => {
      const categoryId = +params['categoryId'];
      const subCategoryId = +params['subCategoryId'];
  
      this.breadcrumbs = [
        { label: 'Accueil', url: '/' },
        { label: 'Produits', url: '/Shop' }
      ];
  
      if (categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        if (category) {
          this.breadcrumbs.push({ label: category.name, url: `/Shop/${categoryId}` });
        }
      }
  
      if (subCategoryId) {
        const subCategory = this.subcategories[categoryId]?.find(sub => sub.id === subCategoryId);
        if (subCategory) {
          this.breadcrumbs.push({ label: subCategory.name });
        }
      }
    });
  }
  

  loadCategoriesAndSubcategories(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;

      this.categories.forEach(category => {
        this.subcategoryService
          .getSubcategoriesByCategory(category.id)
          .subscribe((subcategories: SubCategory[]) => {
            this.subcategories[category.id] = subcategories;
          });
      });
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}

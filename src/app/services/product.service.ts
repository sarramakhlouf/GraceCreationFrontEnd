import { Injectable } from '@angular/core';
import { Product } from '../model/Product.model';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products!: Product[];

  constructor(private http: HttpClient) {}

  // Récupérer la liste des produits
  listeProducts(page: number = 1): Observable<any> {
    return this.http.get<any>(`/api/products?page=${page}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`/api/product/${id}`);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`/api/products/categories/${categoryId}`);
  }

  getProductsBySubCategory(subCategoryId: number): Observable<any> {
    return this.http.get(`/api/products/subcategories/${subCategoryId}`);
  }
  
  /*getFilteredProducts(categories: number[], filters: number[]): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetFiltredProducts`, {
      params: {
        categories: categories.join(','), // Convertit en chaîne
        filters: filters.join(',')
      }
    });
  }*/
}

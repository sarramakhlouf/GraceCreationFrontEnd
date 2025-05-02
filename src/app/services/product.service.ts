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

  listeProducts(): Observable<any> {
    return this.http.get<any>(`/api/products`);
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
  
  getProductsWithDetails(): Observable<any[]> {
    return this.http.get<any[]>(`/api/products-with-details`);
  }

}

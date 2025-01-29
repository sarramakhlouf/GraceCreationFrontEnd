import { Injectable } from '@angular/core';
import { Product } from '../model/Product.model';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products!: Product[];

  // L'URL de l'API Laravel pour les produits
  private apiURL: string = 'http://localhost:8000/api/products';
  private baseUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Récupérer la liste des produits
  listeProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL).pipe(
      catchError((err) => {
        console.error('Erreur lors de la récupération des produits', err);
        return of([]);
      })
    );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/${id}`);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/categories/${categoryId}`);
  }

  getProductsBySubCategory(subCategoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/subcategories/${subCategoryId}`);
  }
  
  getFiltredProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/filtredproducts`);
  }
}

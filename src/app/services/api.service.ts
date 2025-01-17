import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8000/api';  // URL de base de votre API Laravel

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir les produits
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }
  getProductsWithFields() {
    return this.http.get<{ fields: any[]; data: any[] }>(`${this.baseUrl}/products-with-fields`);
  }

  // Méthode pour obtenir les catégories
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  // Méthode pour obtenir les sous-catégories
  getSubCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sub-categories`);
  }
}

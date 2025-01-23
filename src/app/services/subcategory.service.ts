import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategory } from '../model/SubCategory.model';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private apiUrl = 'http://localhost:8000/api/subcategories';

  constructor(private http: HttpClient) {}

  // Récupérer les sous-catégories d'une catégorie spécifique
  getSubcategoriesByCategory(categoryId: number): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.apiUrl}/${categoryId}`);
  }
}

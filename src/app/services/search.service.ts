import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  /*searchProducts(query: string): Observable<any[]> {
    console.log("Recherche envoyée avec:", query); // Vérifie que la fonction est bien appelée
    return this.http.get<any[]>(`${'/api/products/search'}?name=${query}&category=${query}&subcategory=${query}`);
  }*/

  searchProducts(name?: string, categoryId?: number, subcategoryId?: number): Observable<any> {
    let params = new HttpParams();  // Crée un objet pour ajouter les paramètres à l'URL

    if (name){ 
      params = params.set('name', name);
    }
    if (categoryId){ 
      params = params.set('category_id', categoryId.toString());
    }
    if (subcategoryId){
      params = params.set('subcategory_id', subcategoryId.toString());
    }

    return this.http.get<any>('/api/products/search', { params });
  }
}



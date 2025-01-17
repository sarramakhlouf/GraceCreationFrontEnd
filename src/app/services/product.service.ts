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

  

  // Ajouter un produit
  ajouterProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiURL, product, httpOptions);
  }

  // Supprimer un produit
  supprimerProduct(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  // Consulter un produit par ID
  consulterProduct(id: number): Observable<Product> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Product>(url);
  }

  // Mettre à jour un produit
  updateProduct(product: Product): Observable<Product> {
    const url = `${this.apiURL}/${product.id}`;
    return this.http.put<Product>(url, product, httpOptions);
  }

  // Rechercher des produits par nom (par exemple, dans un ShopComponent)
  rechercherParNom(nom: string): Observable<Product[]> {
    const url = `${this.apiURL}/search?name=${nom}`;
    return this.http.get<Product[]>(url);
  }
}

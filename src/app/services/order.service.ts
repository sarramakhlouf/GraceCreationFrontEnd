import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/orders'; // URL de votre backend Laravel

  constructor(private http: HttpClient) {}

  // Méthode pour soumettre la commande
  submitOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }
}

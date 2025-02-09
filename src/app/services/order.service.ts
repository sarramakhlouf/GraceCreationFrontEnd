import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  constructor(private http: HttpClient) {}

  // Méthode pour soumettre la commande
  submitOrder(order: any, products:any) : Observable<any> {
    const body = {
      name: order.name,
      email: order.email,
      address: order.address,
      phone: order.phone,
      total: order.total,
      products: products.map((product: any) => ({
        id: product.id,
        quantity: product.quantity,
        price: product.price
      }))
    };
    return this.http.post('/api/orders', body);
  }

  getOrderStatus(orderId: number) {
    return this.http.get<{ status: number }>(`/api/orders/${orderId}/status`);
  }
  
}

import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  standalone: false,
})
export class OrderComponent {
  orderResponse: any; 
  order = {
    product_id: 1,
    client_name: '',
    client_email: '',
    quantity: 1,
    total_price: 100,
    order_date: new Date().toISOString(),
  };

  constructor(private orderService: OrderService) {}

  // Méthode pour passer la commande
  placeOrder() {
    // Appelez le service pour soumettre la commande
    this.orderService.placeOrder(this.order).subscribe(
      response => {
        // Assignez la réponse du backend à la propriété orderResponse
        this.orderResponse = response;
        console.log('Commande passée avec succès!', response);
      },
      error => {
        // Gérez l'erreur
        console.error('Erreur lors de la commande', error);
        this.orderResponse = { success: false };
      }
    );
  }
}

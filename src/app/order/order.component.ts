import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cart: any[] = [];
  currentDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCartItems();
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);
  }

  getCartDetails() {
    // Format des détails du panier
    return this.cart
      .map(product => `${product.name} (x${product.quantity})`)
      .join(', ');
  }

  submitOrder(orderData: any) {
    const order = {
      ...orderData,
      products: JSON.stringify(this.cart), // Convertir les produits en JSON
      date: this.currentDate,
      total: this.getTotal(),
    };
    console.log('Order being submitted:', order); // Debugging log

    this.orderService.submitOrder(order).subscribe({
      next: (response) => {
        console.log('Order submitted successfully:', response);
        alert('Your order has been submitted!');
        this.cartService.clearCart(); // Vider le panier après la commande
      },
      error: (error) => {
        console.error('Error submitting order:', error);
        alert('There was an error submitting your order.');
      }
    });
  }
}

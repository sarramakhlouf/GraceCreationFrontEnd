import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrl: './shop-cart.component.css',
  standalone: false
})
export class ShopCartComponent implements OnInit {

  cart: any[] = [];
  baseUrl: string = 'http://localhost:8000/storage/';

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cart = this.cartService.getCartItems();
  }

  removeProduct(productId: string) {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCartItems();  // Mettre à jour la liste après suppression
  }

  increaseQuantity(product: any) {
    product.quantity += 1;
    this.updateCart(); // Met à jour le localStorage après la modification
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      this.updateCart(); // Met à jour le localStorage après la modification
    }
  }

  updateCart() {
    // Mise à jour du panier dans le localStorage après modification de la quantité
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  calculateTotal(): number {
    return this.cart.reduce((total, product) => total + product.quantity * product.price, 0);
  }
}

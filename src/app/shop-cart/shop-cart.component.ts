import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrl: './shop-cart.component.css',
  standalone: false
})
export class ShopCartComponent implements OnInit {
  cart: any[] = [];
  orderForm: FormGroup;
  baseUrl: string = 'http://localhost:8000/storage/';

  constructor(
    private cartService: CartService, 
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {
    this.orderForm = this.formBuilder.group({
      name: [''],
      email: [''],
      address: [''],
      phone: [''],
    });
  }

  ngOnInit() {
    this.cart = this.cartService.getCartItems();
  }

  removeProduct(productId: string) {
    this.cartService.removeFromCart(productId);
    this.cart = this.cartService.getCartItems();
  }

  increaseQuantity(product: any) {
    product.quantity += 1;
    this.updateCart();
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      this.updateCart();
    }
  }

  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  calculateSubTotal(): number {
    return this.cart.reduce((total, product) => total + product.quantity * product.price, 0);
  }

  calculateTotal(): number {
    const subtotal = this.cart.reduce((total, product) => total + product.quantity * product.price, 0);
    const shippingFee = 7;
    return subtotal + shippingFee;
  }
  
  getTotalQuantity(): number {
    return this.cart.reduce((total, product) => total + product.quantity, 0);
  }

  submitOrder(orderData: any) {
    const order = {
      ...orderData,
      total: this.calculateTotal(),
    };

    const products = this.cart.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    this.orderService.submitOrder(order, products).subscribe({
      next: () => {
        alert('Votre commande est créée avec succès !');
        this.cartService.clearCart();
        this.cart = [];
        this.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de la soumission de la commande:', error);
        
        if (error.error && error.error.error) {
          alert(error.error.error); 
        } else {
          alert('Une erreur est survenue lors de la soumission de votre commande.');
        }
      }
    });
  }

  resetForm() {
    if (this.orderForm) {
      this.orderForm.reset();
    }
  }
}

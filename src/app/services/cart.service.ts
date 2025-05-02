import { Injectable, Inject, PLATFORM_ID, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isBrowser: boolean;
  cartUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  addToCart(product: any) {
    if (this.isBrowser) {
      let cart = this.getCartItems();
      const existingProduct = cart.find((item: any) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity ?? 1;
      } else {
        product.quantity = product.quantity ?? 1;
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartUpdated.emit();
    }
  }

  getCartItems() {
    if (this.isBrowser) {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  getCartCount(): number {
    return this.getCartItems().reduce((sum: number, item: any) => sum + item.quantity, 0);
  }

  removeFromCart(productId: string) {
    if (this.isBrowser) {
      let cart = this.getCartItems();
      cart = cart.filter((product: any) => product.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartUpdated.emit();
    }
  }

  updateQuantity(productId: string, change: number) {
    if (this.isBrowser) {
      let cart = this.getCartItems();
      const product = cart.find((item: any) => item.id === productId);
      if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
          cart = cart.filter((item: any) => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cartUpdated.emit();
      }
    }
  }
  

  clearCart() {
    if (this.isBrowser) {
      localStorage.removeItem('cart');
      this.cartUpdated.emit();
    }
  }
}

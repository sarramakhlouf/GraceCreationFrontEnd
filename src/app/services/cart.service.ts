// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  // Ajouter un produit au panier dans le localStorage
  addToCart(product: any) {
    let cart = this.getCartItems();

    // Vérifie si le produit existe déjà dans le panier
    const existingProduct = cart.find((item: any) => item.id === product.id);
    if (existingProduct) {
      // Si le produit existe, augmente sa quantité
      existingProduct.quantity += product.quantity ?? 1;
    } else {
      // Sinon, ajoute le produit avec une quantité par défaut de 1
      product.quantity = product.quantity ?? 1;
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Récupérer les produits du panier
  getCartItems() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  // Supprimer un produit du panier
  removeFromCart(productId: string) {
    let cart = this.getCartItems();
    cart = cart.filter((product: any) => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Vider le panier
  clearCart() {
    localStorage.removeItem('cart');
  }
}

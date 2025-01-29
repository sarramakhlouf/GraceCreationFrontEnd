import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone:false
})
export class ProductComponent implements OnInit{
  product: any = null;
  cart: any[] = [];
  baseUrl: string = 'http://localhost:8000/storage/';

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private productService: ProductService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id']; // Récupère l'id dans l'URL
    this.productService.getProductById(productId).subscribe({
      next: (data) => (this.product = data),
      error: (err) => console.error('Error fetching product details:', err),
    });
    this.cart = this.cartService.getCartItems();
  }

  addToCart() {
    this.cartService.addToCart(this.product);
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
  
}

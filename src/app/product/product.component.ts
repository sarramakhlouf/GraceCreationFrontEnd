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
    this.cart = this.cartService.getCartItems();
    const productId = this.route.snapshot.params['id']; 
    this.productService.getProductById(productId).subscribe({
      next: (data) => (this.product = data),
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  
  increaseQuantity(product: any) {
    this.cartService.updateQuantity(product.id, 1);
    this.cart = this.cartService.getCartItems(); // synchroniser le panier local
  }
  
  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      this.cartService.updateQuantity(product.id, -1);
      this.cart = this.cartService.getCartItems();
    }
  }
  
}

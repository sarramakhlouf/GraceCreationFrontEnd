import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone:false
})
export class ProductComponent {
  product = {
    id: 1,
    name: 'Toddler Tutu Dress',
    price: 185.0,
    image: 'assets/imgs/page/homepage1/product24.png',
  };

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
  
}

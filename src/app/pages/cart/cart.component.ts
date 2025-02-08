import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Product[] = [];

  constructor(private cartService: CartService, private orderService: OrderService, private authService: AuthService) {
      this.cartService.getCartItems().subscribe(items => this.cartItems = items);
    }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  placeOrder() {
    const order = {
      userId: this.authService.getUserID() ?? '',
      items: this.cartItems.map((product) => ({
        productId: product.id ?? '', // Ensure productId exists
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
      totalPrice: this.getTotal(),
      status: 'Placed' as 'Placed' | 'Processing' | 'On the way' | 'Delivered',
      createdAt: new Date().toISOString(),
    };
  
    this.orderService.placeOrder(order);
  }

  updateQuantity(product: Product, newQuantity: number) {
    if (newQuantity < 1) return; 
    product.quantity = newQuantity;
    this.cartService.addToCart(product); 
  }
  
  removeFromCart(productId: string | undefined) {
    if (!productId) {
      console.error("Product ID is undefined! Cannot remove from cart.");
      return;
    }
    this.cartService.removeFromCart(productId);
  }

}

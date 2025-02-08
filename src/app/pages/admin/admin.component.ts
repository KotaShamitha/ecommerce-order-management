import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { Order } from '../../models/order.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  orders$!: Observable<Order[]>;

  constructor(private orderService: OrderService, public productService: ProductService) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getAllOrders();
  }

  updateOrderStatus(orderId: string | undefined, newStatus: 'Placed' | 'Processing' | 'On the way' | 'Delivered') {
    if (orderId) {
      this.orderService.updateOrderStatus(orderId, newStatus); 
    }
  }

  updateProductQuantity(productId: string, newQuantity: number) {
    if (newQuantity < 0) return; 
    this.productService.updateProductQuantity(productId, newQuantity);
  }
}

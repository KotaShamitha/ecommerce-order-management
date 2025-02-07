import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { Order } from '../../models/order.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  orders$!: Observable<Order[]>;

  constructor(private orderService: OrderService, private productService: ProductService) {}

  ngOninit(): void {
    this.orders$ = this.orderService.getAllOrders();
  }

  updateOrderStatus(orderId: string, newStatus: string) {
    const validStatus: 'Placed' | 'Processing' | 'On the way' | 'Delivered' =
      newStatus as 'Placed' | 'Processing' | 'On the way' | 'Delivered';
    this.orderService.updtaeOrderStatus(orderId, validStatus);
  }
}

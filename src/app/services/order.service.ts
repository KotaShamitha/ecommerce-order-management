import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private firestore: Firestore) {}

  async placeOrder(order: Order) {
    const ordersCollection = collection(this.firestore, 'orders');
    await addDoc(ordersCollection, order);
  }

  getUserOrders(userId: string): Observable<Order []> {
    const ordersCollection = collection(this.firestore, 'orders');
    return collectionData(ordersCollection, { idField: 'id' }) as Observable<Order[]>; 
  }

  getAllOrders(): Observable<Order[]> {
    const ordersCollection = collection(this.firestore, 'orders');
    return collectionData(ordersCollection, { idField: 'id' }) as Observable<Order[]>;
  }

  async updtaeOrderStatus(orderId: string, status: 'Placed' | 'Processing' | 'On the way' | 'Delivered') {
    const orderDoc = doc(this.firestore, `orders/${orderId}`);
    await updateDoc(orderDoc, { status });
  }


}

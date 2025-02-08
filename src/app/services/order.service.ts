import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, runTransaction, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private firestore: Firestore) {}

  async placeOrder(order: Order) {
    const ordersCollection = collection(this.firestore, 'orders');
    await addDoc(ordersCollection, order);
    for (const item of order.items) {
      const productRef = doc(this.firestore, `products/${item.productId}`);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const productData = productSnap.data();
        const newQuantity = (productData['quantity'] || 0) - item.quantity;
        if (newQuantity >= 0) {
          await updateDoc(productRef, { quantity: newQuantity });
        } else {
          console.error('Not enough stock for', item.name);
        }
      }
    }
  }

  getUserOrders(userId: string): Observable<Order []> {
    const ordersCollection = collection(this.firestore, 'orders');
    return collectionData(ordersCollection, { idField: 'id' }) as Observable<Order[]>; 
  }

  getAllOrders(): Observable<Order[]> {
    const ordersCollection = collection(this.firestore, 'orders');
    return collectionData(ordersCollection, { idField: 'id' }) as Observable<Order[]>;
  }

  async updateOrderStatus(orderId: string, status: 'Placed' | 'Processing' | 'On the way' | 'Delivered') {
    const orderDoc = doc(this.firestore, `orders/${orderId}`);
    await updateDoc(orderDoc, { status });
  }


}

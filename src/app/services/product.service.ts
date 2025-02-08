import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, doc, updateDoc, docData, deleteDoc } from '@angular/fire/firestore';
import { DocumentData, CollectionReference, setDoc } from '@firebase/firestore';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: Firestore) {}

  getProducts(): Observable<Product []> {
    const productRef = collection(this.firestore, 'products');
    return collectionData(productRef, { idField: 'id' }) as Observable<Product []>;
  }

  getProductById(productId: string): Observable<Product | undefined> {
    const productRef = doc(this.firestore, `products/${productId}`);
    return docData(productRef, {idField: 'id' }) as Observable<Product | undefined>;
  }

  async addProduct(product: Product) {
    const productRef = doc(collection(this.firestore, 'products'));
    await setDoc(productRef, {...product, id: productRef.id});
  }

  async updateProduct(productId: string) {
    const productRef = doc(this.firestore, `products/${productId}`);
    await deleteDoc(productRef);
  }

  async reduceStock(productId: string, quantity: number) {
    const productRef = doc(this.firestore, `products/${productId}`);
    const productDoc = await docData(productRef).toPromise();
    if (productDoc && productDoc['quantity'] >= quantity) {
      await updateDoc(productRef, { quantity: productDoc['quantity'] - quantity });
    }
  }

  updateProductQuantity(productId: string, newQuantity: number): Promise<void> {
    const productDocRef = doc(this.firestore, `products/${productId}`);
    return updateDoc(productDocRef, { quantity: newQuantity });
  }
}

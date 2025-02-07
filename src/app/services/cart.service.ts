import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
    providedIn: 'root',
})

export class CartService {
    private cart: Product[] = [];
    private cartSubject = new BehaviorSubject<Product[]>(this.cart);

    getCartItems() {
        return this.cartSubject.asObservable();
    }

    addToCart(product: Product) {
        this.cart.push(product);
        this.cartSubject.next(this.cart);
    }

    removeFromCart(productId: string) {
        this.cart = this.cart.filter(p => p.id !== productId);
        this.cartSubject.next(this.cart);
    }

    clearCart() {
        this.cart = [];
        this.cartSubject.next(this.cart);
    }
}
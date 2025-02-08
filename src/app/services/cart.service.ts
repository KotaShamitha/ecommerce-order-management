import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
    providedIn: 'root',
})

export class CartService {
    private cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    private cartSubject = new BehaviorSubject<Product[]>(this.cart);

    getCartItems() {
        return this.cartSubject.asObservable();
    }

    addToCart(product: Product) {
        this.cart.push(product);
        this.updateCart();
    }

    removeFromCart(productId: string) {
        this.cart = this.cart.filter(p => p.id !== productId);
        this.updateCart();
    }

    clearCart() {
        this.cart = [];
        this.updateCart();
    }

    private updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.cartSubject.next(this.cart);
      }
    
    private loadCartFromStorage(): Product[] {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }
}
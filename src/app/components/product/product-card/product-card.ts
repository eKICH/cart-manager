import { Component, computed, inject, input, output, signal, WritableSignal } from '@angular/core';
import { Product } from '../../../model/product.model';
import { Cart } from '../../../model/cart.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

export interface AddToCartEvent {
  productId: number;
  quantity: number;
}

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  store = inject(Store<AppState>);

  product = input.required<Product>();
  quantity: WritableSignal<number> = signal(1);
  isAdding = signal(false);
  isImageLoaded = signal(false);

  addToCart = output<AddToCartEvent>();

  public quantityInCart = this.store.selectSignal<number>((state: AppState) => {
    return state.cart.entities[this.product()?.id]?.quantity || 0;
  });

  public availableStock = computed(() =>{
    const product = this.product();
    if (!product) return 0;

    const inCart = this.quantityInCart();
    return product.stock - inCart;
  });

  public isInStock = computed(() => this.availableStock() > 0);

  public isStockLimitReached = computed(() => {
    return this.quantity() >= this.availableStock();
  });

  
  incrementQuantity(){

    this.quantity.update(currentQty =>
      currentQty < this.availableStock() ? currentQty + 1 : currentQty
    );
  }

  decrementQuantity(){
    if (this.quantity() === 1) return;
    this.quantity.update(current => current - 1);
  }

  onAddToCart() {

    if(this.isAdding()) return;

    this.isAdding.set(true);

    const productId = this.product().id;
    const currentQuantity = this.quantity();

    if (currentQuantity > this.availableStock()) {
      this.isAdding.set(false);
      return;
    }
    
    this.addToCart.emit({
      productId: productId,
      quantity: currentQuantity,
    });

    this.quantity.set(1);

    setTimeout(() => {
      this.isAdding.set(false)
    }, 1000);

  } 

  onImageLoad(){
    this.isImageLoaded.set(true);
  }

}

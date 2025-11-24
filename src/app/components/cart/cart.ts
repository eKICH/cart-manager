import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { Observable } from 'rxjs';

import { Cart } from '../../model/cart.model';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

import * as CartSelectors from '../../store/selector/cart.selector';
import * as CartActions from '../../store/action/cart.actions';

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {

  store = inject(Store<AppState>)

  items$: Observable<Cart[]>;
  totalAmount$: Observable<number>;

  constructor(){
    this.items$ = this.store.select(CartSelectors.selectCartItems);
    this.totalAmount$ = this.store.select(CartSelectors.selectCartTotalAmount);
  }

  onRemoveItem(productId: number){
    this.store.dispatch(CartActions.removeItem({productId}));
  }

  onClearCart() {
    this.store.dispatch(CartActions.clearCart());
  }

  onQuantityIncrement(item: Cart){
    const newQuantity = item.quantity + 1;
    this.store.dispatch(CartActions.updateQuantity({productId: item.productId, newQuantity}));
  }

  onQuantityDecrement(item: Cart){
    const newQuantity = item.quantity - 1;
    this.store.dispatch(CartActions.updateQuantity({productId: item.productId, newQuantity}));
  }

}

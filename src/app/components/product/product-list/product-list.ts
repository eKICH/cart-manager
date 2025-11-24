import { Component, inject, signal } from '@angular/core';
import { AddToCartEvent, ProductCard } from '../product-card/product-card';
import { Product } from '../../../model/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { Observable } from 'rxjs';

import * as CartActions from '../../../store/action/cart.actions';
import * as ProductActions from '../../../store/action/product.actions'
import * as ProductSelectors from '../../../store/selector/product.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, AsyncPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  private store = inject(Store<AppState>);

  product$: Observable<Product[]>;
  productLoading$: Observable<boolean>;
  cartError$: Observable<string | null>;
  searchTerm$: Observable<string>;
  productError$: Observable<string | null>;

  

  constructor(){
    this.product$ = this.store.select(ProductSelectors.selectFilteredProducts);
    this.productLoading$ = this.store.select(ProductSelectors.selectProductLoading);

    const selectCartError = (state: AppState) => state.cart.error;
    this.cartError$ = this.store.select(selectCartError);
    this.searchTerm$ = this.store.select(ProductSelectors.selectSearchTerm);
    this.productError$ = this.store.select(ProductSelectors.selectProductError);

    this.store.dispatch(ProductActions.loadProducts());
  }


  onAddToCart(event: AddToCartEvent){
    // console.log(`Dispatching Add Item: Product ID ${event.productId}, Qty: ${event.quantity}`);
    
    this.store.dispatch(CartActions.addItem({
      productId: event.productId,
      quantity: event.quantity
    }));

  }

  hideToast() {
    this.store.dispatch(ProductActions.clearProductError());
  }

}

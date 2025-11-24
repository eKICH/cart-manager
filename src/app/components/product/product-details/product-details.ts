import { Component, computed, inject, input, output, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, take } from 'rxjs';
import { Product } from '../../../model/product.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';

import * as ProductSelectors from '../../../store/selector/product.selector';
import * as ProductActions from '../../../store/action/product.actions';
import * as CartActions from '../../../store/action/cart.actions';
import { AddToCartEvent } from '../product-card/product-card';


@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {

  store = inject(Store<AppState>);
  route = inject(ActivatedRoute);

  quantity = signal(1);
  isAdding = signal(false);
  addToCart = output<AddToCartEvent>();

  constructor(){
    this.store.select(ProductSelectors.selectAllProducts).pipe(take(1)).subscribe(products => {
      this.store.select(ProductSelectors.selectProductLoading).pipe(take(1)).subscribe(isLoading => {
        if (products.length === 0 && !isLoading) {
          this.store.dispatch(ProductActions.loadProducts());
        }
      });
    });
  }
  
  // Get ID from the route
  private productId$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id')))
  );


  // Use the ID to select the correct product from the store
  public product: Signal<Product | undefined> = toSignal(
    this.productId$.pipe(
      switchMap(id => this.store.select(ProductSelectors.selectProductById(id)))
    )
  );


  public quantityInCart = this.store.selectSignal<number>((state: AppState) => {
    const product = this.product();
    if(!product) return 0;
    return state.cart.entities[product?.id]?.quantity || 0;

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
    this.quantity.update(current => current + 1);
  }

  decrementQuantity(){
    if(this.quantity() === 1) return;
    this.quantity.update(current => current - 1);
  }

  onAddToCart(){
    if(this.isAdding()) return;

    this.isAdding.set(true);


    const product = this.product();
    if (!product) return;

    const currentQuantity = this.quantity();

    this.store.dispatch(CartActions.addItem({
      productId:product?.id,
      quantity:currentQuantity,
    }))

    this.quantity.set(1);

    setTimeout(() => {
      this.isAdding.set(false)
    }, 1000);

  }

}

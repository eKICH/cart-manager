import { inject, Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import { AppState } from "../state/app.state";
import { catchError, map, of, switchMap, take, withLatestFrom } from "rxjs";
import * as CartActions from '../action/cart.actions';
import * as ProductSelectors from '../selector/product.selector';
import { Cart } from "../../model/cart.model"

@Injectable()

export class CartEffects {

    private actions$ = inject(Actions);
    private store = inject(Store<AppState>);
 

   addItemToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addItem),

      switchMap(action =>
        this.store.select(ProductSelectors.selectProductById(action.productId)).pipe(
          take(1),

          map(product => {
            if (!product) {
              console.error(`Product with ID ${action.productId} not found for cart addition.`);
              return CartActions.addItemFailed({ error: `Product ${action.productId} not found.` });
            }

            const item: Cart = {
              productId: product.id,
              name: product.name,
              price: product.price,
              stock: product.stock,
              prodImage: product.prodImage,
              quantity: action.quantity
            };

            return CartActions.addItemReady({ item });
          }),

          catchError(error => {
            console.error('Error during product lookup:', error);
            return of(CartActions.addItemFailed({ error: 'Internal error during product lookup.' }));
          })
        )
      )
    )
  );
}
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, map, of, switchMap } from "rxjs";

import * as ProductActions from '../action/product.actions';
import { Product } from "../../model/product.model";
import { ProductService } from "../../services/product.service";

const MOCK_PRODUCTS: Product[] = [
    {
            id: 1,
            name: "Test Product",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            price: 9.99,
            stock: 8,
            prodImage: "images/buds.webp"
        },
        {
            id: 2,
            name: "Test Product 2",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            price: 10.99,
            stock: 11,
            prodImage: "images/shoe.jpg"
        },
]

@Injectable()
export class ProductEffects {

  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),

      switchMap(() =>
        this.productService.getProducts().pipe(
          map(products =>
            ProductActions.loadProductsSuccess({ products: products })
          ),
          catchError(error =>
            of(ProductActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  clearError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsFailure),
      delay(5000),
      map(() => ProductActions.clearProductError())
    )
  );
}
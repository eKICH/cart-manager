import { createAction, props } from "@ngrx/store";
import { Product } from "../../model/product.model";

export const loadProducts = createAction('[products]load products');

export const loadProductsSuccess = createAction(
    '[products]load products success',
    props<{products: Product[]}>()
);

export const loadProductsFailure = createAction(
    '[products]load products failure',
    props<{error: string}>()
);

export const clearProductError = createAction(
    '[products] clear product error',
);


export const setSearchTerm = createAction(
    '[products] set search term',
    props<{searchTerm: string}>()
);

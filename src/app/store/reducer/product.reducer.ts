import { Action, createReducer, on } from "@ngrx/store";
import { initialProductState, ProductState } from "../state/product.state";
import * as ProductActions from '../action/product.actions';

export const _productReducer = createReducer(
    initialProductState,

    on(ProductActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(ProductActions.loadProductsSuccess, (state, { products }) => ({
        ...state,
        loading: false,
        error: null,
        products: products
    })),

    on(ProductActions.loadProductsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
        products: []
    })),

    on(ProductActions.clearProductError, (state) => ({
        ...state,
        error: null
    })),

    on(ProductActions.setSearchTerm, (state, { searchTerm }) => ({
        ...state,
        searchTerm: searchTerm
    }))   
);

export function productReducer(state: ProductState | undefined, action: Action){
    return _productReducer(state, action);
}
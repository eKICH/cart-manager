import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "../state/product.state";
import { Product } from "../../model/product.model";

export const selectProductFeature = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(selectProductFeature, (state: ProductState) => state.products);

export const selectProductLoading = createSelector(selectProductFeature, (state: ProductState) => state.loading);

export const selectProductError = createSelector(selectProductFeature, (state: ProductState) => state.error);

export const selectSearchTerm = createSelector(selectProductFeature, (state: ProductState) => state.searchTerm);

export const selectProductEntities = createSelector(
    selectAllProducts, 
    (products) => products.reduce((entities: {[id:number]: Product}, product) => {
        entities[product.id] = product;
        return entities;
    },
    {}
));

export const selectProductById = (id: number) => createSelector(
    selectProductEntities,
    (entities) => entities[id] 
);

export const selectFilteredProducts = createSelector(
    selectAllProducts,
    selectSearchTerm,
    (products, searchTerm) => {

        if(!searchTerm) return products;

        return products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
)
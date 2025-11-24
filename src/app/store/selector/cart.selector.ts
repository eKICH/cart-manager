import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "../state/cart.state";

export const selectCartFeature = createFeatureSelector<CartState>('cart');

export const selectCartEntities = createSelector(selectCartFeature, (state: CartState) => state.entities);
export const selectCartIds = createSelector(selectCartFeature, (state: CartState) => state.ids);

export const selectCartItems = createSelector(selectCartIds, selectCartEntities, (ids, entities) => ids.map(id => entities[id]));

export const selectCartTotalQuantity = createSelector(selectCartItems, (items) => items.reduce((total, item) => total + item.quantity, 0));

export const selectCartTotalAmount = createSelector(selectCartItems, (items) => items.reduce((total, item) => total + (item.price * item.quantity), 0));

export const selectIsCheckingOut = createSelector(selectCartFeature, (state: CartState) => state.isCheckingOut);
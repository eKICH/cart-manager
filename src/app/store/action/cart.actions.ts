import { createAction, props } from "@ngrx/store";
import { Cart } from "../../model/cart.model";

export const addItem = createAction(
    '[Cart]Add Item',
    props<{productId: number, quantity: number}>()
);

export const addItemReady = createAction(
    '[Cart]Add Item Ready',
    props<{item: Cart}>()
);

export const addItemFailed = createAction(
    '[Cart]Add Item Failed',
    props<{error: string}>()
);

export const updateQuantity = createAction(
    '[Cart]Update Quantity',
    props<{productId: number, newQuantity: number}>()
);

export const removeItem = createAction(
    '[Cart]Remove Item',
    props<{productId: number}>()
);

export const clearCart = createAction('Clear Cart');
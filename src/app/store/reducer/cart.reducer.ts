import { Action, on, createReducer } from "@ngrx/store";
import { initialCartState, CartState } from "../state/cart.state";
import * as CartActions from '../action/cart.actions';
import { Cart } from "../../model/cart.model";

export const _cartReducer = createReducer(
    initialCartState,

    on(CartActions.addItemReady, (state, {item}) => {
        const existingItem = state.entities[item.productId];

        if (existingItem) {
            const newQuantity = existingItem.quantity + item.quantity;

            const updatedItem: Cart = {
                ...existingItem,
                quantity: newQuantity,
            };

            return {
                ...state,
                entities: {
                    ...state.entities,
                    [item.productId]: updatedItem,
                },
            };
        } else {
            return {
            ...state,
            ids: [...state.ids, item.productId],
            entities: {
            ...state.entities,
            [item.productId]: item,
            },
         };
        };
    }),


    on(CartActions.addItemFailed, (state, { error }) => ({
        ...state,
        error: error, 
    })),

    on(CartActions.updateQuantity, (state, { productId, newQuantity }) => {

        if (newQuantity <=0) {

            const {[productId]: removed, ...newEntities } = state.entities;
            const newIds = state.ids.filter(id => id !== productId)

            return {
                ...state,
                entities: newEntities,
                ids: newIds
            };       
        }

        const existingItem = state.entities[productId];
        if (!existingItem) {
            return state;
        }

        const updatedItem: Cart = {
            ...existingItem,
            quantity: newQuantity
        };

        return {
            ...state,
            entities: {
                ...state.entities,
                [productId]: updatedItem
            },
        };
    }),

    on(CartActions.removeItem, (state, { productId }) => {
    const { [productId]: removed, ...newEntities } = state.entities;

    const newIds = state.ids.filter(id => id !== productId);

    return {
      ...state,
      entities: newEntities,
      ids: newIds,
    };
  }),

    on(CartActions.clearCart, () => ({...initialCartState}))
);

export function cartReducer(state: CartState | undefined, action: Action) {
  return _cartReducer(state, action);
}
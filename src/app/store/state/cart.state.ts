import { Cart } from "../../model/cart.model"

export interface CartState {
    entities: Record<number, Cart>;
    ids: number[];
    error: string | null;
    isCheckingOut: boolean;
}

export const initialCartState: CartState = {
    entities: {},
    ids: [],
    error: null,
    isCheckingOut: false
}
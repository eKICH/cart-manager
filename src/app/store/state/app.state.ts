import { CartState } from "./cart.state";
import { ProductState } from "./product.state";

export interface AppState {
    products: ProductState;
    cart: CartState;
}
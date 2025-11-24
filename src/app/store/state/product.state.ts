import { Product } from "../../model/product.model"

export interface ProductState {
    products: Product[],
    loading: boolean,
    error: string | null
    searchTerm: string
}

export const initialProductState: ProductState = {
    products: [],
    loading: false,
    error: null,
    searchTerm: ''
}
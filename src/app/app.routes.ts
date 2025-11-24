import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart';
import { Product } from './components/product/product';
import { ProductDetails } from './components/product/product-details/product-details';

export const routes: Routes = [
    {path: '', component: Product},
    {path: 'cart', component: CartComponent},
    {path: 'product/:id/:name', component: ProductDetails},
    {path: '**', component: Product}
];

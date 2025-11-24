import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools'

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { productReducer } from './store/reducer/product.reducer';
import { cartReducer } from './store/reducer/cart.reducer';
import { provideEffects } from '@ngrx/effects';
import { CartEffects } from './store/effect/cart.effects';
import { ProductEffects } from './store/effect/product.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      products: productReducer,
      cart: cartReducer
    }),
    provideEffects([CartEffects, ProductEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
  ]
};

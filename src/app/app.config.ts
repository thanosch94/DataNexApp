import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './state/products/products.effects';
import { provideStore } from '@ngrx/store';
import { productsReducer } from './state/products/products.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { brandsReducer } from './state/parameters/brands/brands.reducer';
import { BrandsEffects } from './state/parameters/brands/brands.effects';
import { vatClassesReducer } from './state/parameters/vat-classes/vat-classes.reducer';
import { VatClassesEffects } from './state/parameters/vat-classes/vat-classes.effects';
import { AdditionalChargesEffects } from './state/parameters/additional-charges/additional-charges.effects';
import { additionalChargesReducer } from './state/parameters/additional-charges/additional-charges.reducer';
import { StatusesEffects } from './state/parameters/statuses/statuses.effects';
import { statusesReducer } from './state/parameters/statuses/statuses.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideStore({
      products: productsReducer,
      brands: brandsReducer,
      vatClasses: vatClassesReducer,
      additionalCharges: additionalChargesReducer,
      statuses: statusesReducer,
    }),
    provideEffects([
      ProductEffects,
      BrandsEffects,
      VatClassesEffects,
      AdditionalChargesEffects,
      StatusesEffects,
    ]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
};

import { workItemsEffects } from './state/work-items/work-items.effects';
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
import { CompaniesEffects } from './state/parameters/companies/companies.effects';
import { companiesReducer } from './state/parameters/companies/companies.reducer';
import { documentTypesReducer } from './state/parameters/document-types/document-types.reducer';
import { DocumentTypesEffects } from './state/parameters/document-types/document-types.effects';
import { workItemTypesEffects } from './state/parameters/work-item-types/work-item-types.effects';
import { workItemTypesReducer } from './state/parameters/work-item-types/work-item-types.reducer';
import { usersReducer } from './state/users/users.reducer';
import { UsersEffects } from './state/users/users.effects';
import { workItemsReducer } from './state/work-items/work-items.reducer';
import { appPermissionsReducer } from './state/app-permissions/app-permissions.reducer';
import { AppPermissionsEffects } from './state/app-permissions/app-permissions.effects';
import { UserAppPermissionsEffects } from './state/user-app-permissions/user-app-permissions.effects';
import { userAppPermissionsReducer } from './state/user-app-permissions/user-app-permissions.reducer';
import { CntorDatasourcesEffects } from './state/parameters/connector-datasources/cntor-datasources.effects';
import { connectorDatasourcesReducer } from './state/parameters/connector-datasources/cntor-datasources.reducer';
import { CntorDatasourceEntitiesEffects } from './state/parameters/cntor-datasource-entities/cntor-datasource-entities.effects';
import { cntorDatasourceEntitiesReducer } from './state/parameters/cntor-datasource-entities/cntor-datasource-erntities.reducer';

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
      companies:companiesReducer,
      documentTypes:documentTypesReducer,
      workItemTypes: workItemTypesReducer,
      workItems:workItemsReducer,
      users:usersReducer,
      appPermissions:appPermissionsReducer,
      userAppPermissions:userAppPermissionsReducer,
      connectorDatasources:connectorDatasourcesReducer,
      connectorDatasourceEntities:cntorDatasourceEntitiesReducer
    }),
    provideEffects([
      ProductEffects,
      BrandsEffects,
      VatClassesEffects,
      AdditionalChargesEffects,
      StatusesEffects,
      CompaniesEffects,
      DocumentTypesEffects,
      workItemTypesEffects,
      UsersEffects,
      workItemsEffects,
      AppPermissionsEffects,
      UserAppPermissionsEffects,
      CntorDatasourcesEffects,
      CntorDatasourceEntitiesEffects
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

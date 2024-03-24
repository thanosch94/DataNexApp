import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { DocumentsListComponent } from './pages/documents-list/documents-list.component';
import { DocumentEditComponent } from './pages/document-edit/document-edit.component';
import { DocumentTypesComponent } from './pages/document-types/document-types.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { ProductSizesListComponent } from './pages/product-sizes-list/product-sizes-list.component';
import { StatusesListComponent } from './pages/statuses-list/statuses-list.component';

export const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    children:[

    ]
  },
  {
    path:'customer-edit',
    component:CustomerEditComponent
  },
  {
    path:'customers-list',
    component:CustomersListComponent
  },
  {
    path:'documents-list',
    component:DocumentsListComponent
  },
  {
    path:'document-edit',
    component:DocumentEditComponent
  },
  {
    path:'products-list',
    component:ProductsListComponent
  },
  {
    path:'product-edit',
    component:ProductEditComponent
  },
  {
    path:'product-sizes-list',
    component:ProductSizesListComponent
  },
  {
    path:'users-list',
    component:UsersListComponent
  },
  {
    path:'document-types-list',
    component:DocumentTypesComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'statuses-list',
    component:StatusesListComponent
  }

];

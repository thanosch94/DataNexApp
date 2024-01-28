import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { UsersListComponent } from './pages/users-list/users-list.component';

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
    path:'orders-list',
    component:OrdersListComponent
  },
  {
    path:'products-list',
    component:ProductsListComponent
  },
  {
    path:'users-list',
    component:UsersListComponent
  },
  {
    path:'home',
    component:HomeComponent
  }
];

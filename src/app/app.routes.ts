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
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path:"",
    redirectTo:"login",
    pathMatch:'full'

  },

  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'customer-edit',
    component:CustomerEditComponent,
    canActivate:[authGuard]
  },
  {
    path:'customers-list',
    component:CustomersListComponent,
    canActivate:[authGuard]
  },
  {
    path:'documents-list',
    component:DocumentsListComponent,
    canActivate:[authGuard]

  },
  {
    path:'document-edit',
    component:DocumentEditComponent,
    canActivate:[authGuard]

  },
  {
    path:'products-list',
    component:ProductsListComponent,
    canActivate:[authGuard]

  },
  {
    path:'product-edit',
    component:ProductEditComponent,
    canActivate:[authGuard]

  },
  {
    path:'product-sizes-list',
    component:ProductSizesListComponent,
    canActivate:[authGuard]

  },
  {
    path:'users-list',
    component:UsersListComponent,
    canActivate:[authGuard]
  },
  {
    path:'user-edit',
    component:UserEditComponent,
    canActivate:[authGuard]
  },
  {
    path:'document-types-list',
    component:DocumentTypesComponent,
    canActivate:[authGuard]
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[authGuard]
  },
  {
    path:'statuses-list',
    component:StatusesListComponent,
    canActivate:[authGuard]
  }

];

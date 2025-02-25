import { Routes } from '@angular/router';
import { CustomerEditComponent } from './pages/sales/customer-edit/customer-edit.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsListComponent } from './pages/inventory/products-list/products-list.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { DocumentsListComponent } from './pages/documents-list/documents-list.component';
import { DocumentEditComponent } from './pages/document-edit/document-edit.component';
import { ProductEditComponent } from './pages/inventory/product-edit/product-edit.component';
import { ProductSizesListComponent } from './pages/product-sizes-list/product-sizes-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { BrandsListComponent } from './pages/configuration/brands-list/brands-list.component';
import { LogsListComponent } from './pages/logs-list/logs-list.component';
import { ConnectorHomeComponent } from './pages/connector/connector-home/connector-home.component';
import { ConnectorParametersComponent } from './pages/connector/connector-parameters/connector-parameters.component';
import { ConnectorDatasourcesOptionsComponent } from './pages/connector/connector-datasources-options/connector-datasources-options.component';
import { ConnectorReceiveTransferComponent } from './pages/connector/connector-receive-transfer/connector-receive-transfer.component';
import { ConnectorReceiveTransferEditComponent } from './pages/connector/connector-receive-transfer-edit/connector-receive-transfer-edit.component';
import { CustomersListComponent } from './pages/sales/customers-list/customers-list.component';
import { WarehousesListComponent } from './pages/inventory/warehouses-list/warehouses-list.component';
import { SalesReportsComponent } from './pages/sales/sales-reports/sales-reports.component';
import { SuppliersComponent } from './pages/purchasing/suppliers-list/suppliers-list.component';
import { AdditionalChargesListComponent } from './pages/configuration/additional-charges-list/additional-charges-list.component';
import { DocumentTypesListComponent } from './pages/configuration/document-types-list/document-types-list.component';
import { StatusesListComponent } from './pages/configuration/statuses-list/statuses-list.component';
import { SupplierEditComponent } from './pages/purchasing/supplier-edit/supplier-edit.component';
import { VatClassesComponent } from './pages/configuration/vat-classes/vat-classes.component';
import { CompaniesListComponent } from './pages/configuration/companies-list/companies-list.component';
import { AccountsPayableComponent } from './pages/financial/accounts-payable/accounts-payable.component';
import { AccountsReceivableComponent } from './pages/financial/accounts-receivable/accounts-receivable.component';
import { CustomersLedgerComponent } from './pages/financial/customers-ledger/customers-ledger.component';
import { DocumentTypeEditComponent } from './pages/configuration/document-type-edit/document-type-edit.component';
import { GeneralOptionsComponent } from './pages/configuration/general-options/general-options.component';
import { LotsListComponent } from './pages/configuration/lots/lots-list.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';

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
    path:'register-form',
    component:RegisterFormComponent,
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
    component:DocumentTypesListComponent,
    canActivate:[authGuard]
  },
  {
    path:'document-type-edit',
    component:DocumentTypeEditComponent,
    canActivate:[authGuard],
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
  },
  {
    path:'brands-list',
    component:BrandsListComponent,
    canActivate:[authGuard]
  },
  {
    path:'additional-charges-list',
    component:AdditionalChargesListComponent,
    canActivate:[authGuard]
  },
  {
    path:'logs-list',
    component:LogsListComponent,
    canActivate:[authGuard]
  },
  {
    path:'connector-home',
    component:ConnectorHomeComponent,
    canActivate:[authGuard]
  },
  {
    path:'connector-parameters',
    component:ConnectorParametersComponent,
    canActivate:[authGuard]
  },
  {
    path:'connector-datasources-options',
    component:ConnectorDatasourcesOptionsComponent,
    canActivate:[authGuard]
  },
  {
    path:'connector-receive-transfer',
    component:ConnectorReceiveTransferComponent,
    canActivate:[authGuard]
  },
  {
    path:'connector-receive-transfer-edit',
    component:ConnectorReceiveTransferEditComponent,
    canActivate:[authGuard]
  },
  {
    path:'warehouses-list',
    component:WarehousesListComponent,
    canActivate:[authGuard]
  },
  {
    path:'sales-reports',
    component:SalesReportsComponent,
    canActivate:[authGuard]
  },
  {
    path:'suppliers-list',
    component:SuppliersComponent,
    canActivate:[authGuard]
  },
  {
    path:'supplier-edit',
    component:SupplierEditComponent,
    canActivate:[authGuard]
  },
  {
    path:'vat-classes-list',
    component:VatClassesComponent,
    canActivate:[authGuard]
  },
  {
    path:'companies-list',
    component:CompaniesListComponent,
    canActivate:[authGuard]
  },
  {
    path:'accounts-payable-list',
    component:AccountsPayableComponent,
    canActivate:[authGuard]
  },
  {
    path:'accounts-receivable-list',
    component:AccountsReceivableComponent,
    canActivate:[authGuard]
  },
  {
    path:'customers-ledger',
    component:CustomersLedgerComponent,
    canActivate:[authGuard]
  },
  {
    path:'general-options',
    component:GeneralOptionsComponent,
    canActivate:[authGuard]
  },
  {
    path:'lots-list',
    component:LotsListComponent,
    canActivate:[authGuard]
  }

];

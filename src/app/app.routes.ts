import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';

export const routes: Routes = [
  {
    path:"",
    component:AppComponent,
    children:[

    ]
  },
  {
    path:'customer-edit',
    component:CustomerEditComponent
  }
];

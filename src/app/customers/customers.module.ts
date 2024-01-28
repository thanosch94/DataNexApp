import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';



@NgModule({
  declarations: [],
  imports: [
    CustomerEditComponent,
    CommonModule
  ],
  exports:[CustomerEditComponent]
})
export class CustomersModule { }

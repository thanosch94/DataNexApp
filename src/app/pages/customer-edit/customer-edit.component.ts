import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomersViewModel } from './../../view-models/customers.viewmodel';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CustomerDto } from '../../dto/customer.dto';
import { WebAppBase } from '../../base/web-app-base';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatToolbarModule,MatIconModule,HttpClientModule,MatSortModule],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  customer_text:string
  customersViewModel: CustomersViewModel;
  customer:CustomerDto
  customerId: any;
  customerName: string;
  customerSurname: string;
constructor(private http:HttpClient,private router:Router){
this.customersViewModel =new CustomersViewModel(this.http)
this.customer = new CustomerDto()
this.customerId = WebAppBase.data
}

ngOnInit() {
  if(this.customerId){
this.customer_text ="Customer Edit"

  this.customersViewModel.GetById(this.customerId).subscribe((result:any)=>{
    result as CustomerDto
    this.customer =result
debugger
    this.customerName =this.customer.Name.substring(0,(this.customer.Name.indexOf(" ")))
    this.customerSurname =this.customer.Name.substring((this.customer.Name.indexOf(" ")+1),)
  })
}else{
  debugger
  this.customer_text ="New Customer"
  this.customer = new CustomerDto()
}
}

onCloseClicked(e:any){
this.router.navigate(['customers-list'])
}

onSaveClicked(e:any){
  debugger
  this.customer.Name = this.customerName +" "+this.customerSurname;
this.customersViewModel.InsertDto(this.customer).subscribe((result:any)=>{

})
}

ngOnDestroy() {
  WebAppBase.data=undefined
}
}


import { CustomersViewModel } from './../../view-models/customers.viewmodel';
import { Component, NgModule } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { CustomerDto } from '../../dto/customer.dto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [ MatPaginator,MatPaginatorModule,MatSort,MatSortModule, MatInputModule, MatFormFieldModule,MatTableModule,HttpClientModule,
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent {
  customersViewModel :CustomersViewModel
  constructor(private http:HttpClient){
    const users = new Array(5)
this.customersViewModel=new CustomersViewModel(this.http)
    // Assign the data to the data source for the table to render
    debugger

    this.customersViewModel.GetAll().subscribe((result:any)=>{
      this.dataSource = result
    })
  }
displayedColumns: string[] = ['Name','BAddress','BRegion','BPostalCode','BCity','BCountry','BPhone1','BPhone2'];
dataSource: MatTableDataSource<CustomerDto>;
  applyFilter(e:any){
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createNewUser(id: number): CustomerDto {
    let customer=new CustomerDto()
    // const name =
    //   NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    //   ' ' +
    //   NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    //   '.';

     return customer
}
}

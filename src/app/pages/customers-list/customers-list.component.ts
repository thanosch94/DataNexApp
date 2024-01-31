import { CustomersViewModel } from './../../view-models/customers.viewmodel';
import { AfterViewInit, Component, NgModule, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortHeader, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { CustomerDto } from '../../dto/customer.dto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { WebAppBase } from '../../base/web-app-base';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [ MatButtonModule,MatIconModule,MatPaginator,MatPaginatorModule,MatSort,MatSortModule, MatInputModule, MatFormFieldModule,MatTableModule,HttpClientModule,MatSortHeader,
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css'
})
export class CustomersListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  customersViewModel :CustomersViewModel
  constructor(private http:HttpClient, private router:Router){
this.customersViewModel=new CustomersViewModel(this.http)
    // Assign the data to the data source for the table to render


  }



  ngAfterViewInit() {
    this.customersViewModel.GetAll().subscribe((result:any)=>{
            this.dataSource = new MatTableDataSource(result)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;


          })
  }
displayedColumns: string[] = ['Name','BAddress','BRegion','BPostalCode','BCity','BCountry','BPhone1','BPhone2', 'edit'];
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

addCustomer() {
this.router.navigate(['customer-edit'])
}

editCustomer(customer:any){
  debugger
  WebAppBase.data = customer.Id
  this.router.navigate(['customer-edit'])

}
deleteCustomer(element:any){

}

}

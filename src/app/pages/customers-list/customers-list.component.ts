import { CustomersViewModel } from './../../view-models/customers.viewmodel';
import { AfterViewInit, Component, NgModule, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomerDto } from '../../dto/customer.dto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { WebAppBase } from '../../base/web-app-base';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    HttpClientModule,
    MatSortHeader,
    DnToolbarComponent
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css',
})
export class CustomersListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'Name',
    'Address',
    'Region',
    'PostalCode',
    'City',
    'Country',
    'Phone1',
    'Phone2',
    'edit',
  ];
  dataSource: MatTableDataSource<CustomerDto>;
  customersViewModel: CustomersViewModel;
  customer_list_text: string;
  constructor(private http: HttpClient, private router: Router) {
    this.customersViewModel = new CustomersViewModel(this.http);
    this.customer_list_text  = "Customer List"
  }

  ngAfterViewInit() {
    this.customersViewModel.GetAll().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addCustomer() {
    this.router.navigate(['customer-edit']);
  }

  editCustomer(customer: any) {
    WebAppBase.data = customer.Id;
    this.router.navigate(['customer-edit']);
  }
  deleteCustomer(element: any) {}

  onInsertClicked(e:any){
    this.router.navigate(['customer-edit']);
  }
}

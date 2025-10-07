import { TabsService } from './../../../services/tabs.service';
import { Observable } from 'rxjs';
import { selectAllCustomers } from './../../../state/parameters/customers/customers.selectors';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WebAppBase } from '../../../base/web-app-base';
import { CustomerDto } from '../../../dto/customer.dto';
import { AuthService } from '../../../services/auth.service';
import { CustomersViewModel } from '../../../view-models/customers.viewmodel';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { BaseComponent } from '../../components/base/base.component';
import { GetAllCustomers } from '../../../state/parameters/customers/customers.actions';
import { AsyncPipe } from '@angular/common';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';

@Component({
  selector: 'app-customers-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    AsyncPipe,
    DnToolbarComponent,
    MatTooltipModule,
    DnGridComponent,
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css',
})
export class CustomersListComponent extends BaseComponent implements OnInit {
  dataSource: Observable<CustomerDto[]>;
  customersViewModel: CustomersViewModel;
  customer_list_text: string;
  columns: DnColumnDto[];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private columnsService: ColumnsService
  ) {
    super();
    this.customersViewModel = new CustomersViewModel(this.http, this.auth);
    this.customer_list_text = 'Customer List';
    this.tabsService.setActiveTabName(this.customer_list_text);
  }

  ngOnInit() {
    this.getColumns();
    this.getData();
  }

  getData() {
    this.store.dispatch(GetAllCustomers.action());
    this.dataSource = this.store.select(selectAllCustomers);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.CustomerList);
  }

  addCustomer() {
    this.router.navigate(['customer-edit']);
  }

  onInsertClicked(e: any) {
    this.router.navigate(['customer-edit']);
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onRowEditing(e: any) {
    WebAppBase.data = e.Id;
    this.router.navigate(['customer-edit']);
  }

  onRowDelete(data: any) {
    this.customersViewModel.DeleteById(data.Id).subscribe({
      next: (result) => {
        this.displayNotification('Record deleted');
        this.getData();
      },
      error: (err) => {
        this.displayErrorAlert(err);
      },
    });
  }
}

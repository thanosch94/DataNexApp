import { TabsService } from './../../../services/tabs.service';
import { Observable } from 'rxjs';
import { selectAllCustomers, selectCustomerById } from './../../../state/parameters/customers/customers.selectors';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WebAppBase } from '../../../base/web-app-base';
import { CustomerDto } from '../../../dto/customer.dto';
import { AuthService } from '../../../services/auth.service';
import { CustomersViewModel } from '../../../view-models/customers.viewmodel';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { BaseComponent } from '../../components/base/base.component';
import { GetAllCustomers } from '../../../state/parameters/customers/customers.actions';
import { threadId } from 'worker_threads';
import { AsyncPipe } from '@angular/common';

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
        DnGridComponent
    ],
    templateUrl: './customers-list.component.html',
    styleUrl: './customers-list.component.css'
})

export class CustomersListComponent extends BaseComponent implements OnInit {
  dataSource: Observable<CustomerDto[]>;
  customersViewModel: CustomersViewModel;
  customer_list_text: string;
  columns:DnColumnDto[]

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private tabsService:TabsService
  ) {
    super();
    this.customersViewModel = new CustomersViewModel(this.http, this.auth);
    this.customer_list_text = 'Customer List';
    this.tabsService.setActiveTabName(this.customer_list_text)
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.store.dispatch(GetAllCustomers.action())
    this.dataSource = this.store.select(selectAllCustomers)
  }

  getColumns(){
    this.columns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Address',
        DataType: 'string',
        Caption: 'Address',
      },
      {
        DataField: 'Region',
        DataType: 'string',
        Caption: 'Region',
      },
      {
        DataField: 'PostalCode',
        DataType: 'string',
        Caption: 'Postal Code',
      },
      {
        DataField: 'City',
        DataType: 'string',
        Caption: 'City',
      },
      {
        DataField: 'Country',
        DataType: 'string',
        Caption: 'Country',
      },
      {
        DataField: 'Phone1',
        DataType: 'string',
        Caption: 'Phone 1',
      },
      {
        DataField: 'Phone2',
        DataType: 'string',
        Caption: 'Phone 2',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ]
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

  onRowEditingg(e:any){
    e.preve
    WebAppBase.data = e.Id;
    this.router.navigate(['customer-edit']);
  }

  onRowDelete(data:any){
    this.customersViewModel.DeleteById(data.Id).subscribe({
      next: (result) => {
        this.getData();

        this._snackBar.open('Record deleted', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
      },
      error: (err) => {
        const dialog = this.dialog.open(DnAlertComponent, {
          data: {
            Title: 'Message',
            Message: err.error.innerExceptionMessage,
          },
        });
      },
    });  }
}

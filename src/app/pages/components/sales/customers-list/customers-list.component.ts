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
import { WebAppBase } from '../../../../base/web-app-base';
import { CustomerDto } from '../../../../dto/customer.dto';
import { AuthService } from '../../../../services/auth.service';
import { CustomersViewModel } from '../../../../view-models/customers.viewmodel';
import { DeleteConfirmComponent } from '../../delete-confirm/delete-confirm.component';
import { DnAlertComponent } from '../../dn-alert/dn-alert.component';
import { DnToolbarComponent } from '../../dn-toolbar/dn-toolbar.component';

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
    DnToolbarComponent,
    MatTooltipModule
  ],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css',
})

export class CustomersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('customersTable') customersTable: MatTable<CustomerDto>;

  displayedColumns: string[] = [
    'Name',
    'Address',
    'Region',
    'PostalCode',
    'City',
    'Country',
    'Phone1',
    'Phone2',
    'buttons',
  ];
  dataSource: MatTableDataSource<CustomerDto>;
  customersViewModel: CustomersViewModel;
  customer_list_text: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.customersViewModel = new CustomersViewModel(this.http, this.auth);
    this.customer_list_text = 'Customer List';
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
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

  deleteCustomer(data: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '320px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.deleteItem(data);
      } else {
      }
    });
  }

  deleteItem(data: any) {
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
    });
  }

  onInsertClicked(e: any) {
    this.router.navigate(['customer-edit']);
  }

  onRefreshClicked(e: any) {
    this.getData();
    this.customersTable.renderRows();
  }
}

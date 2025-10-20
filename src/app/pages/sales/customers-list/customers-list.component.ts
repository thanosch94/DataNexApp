import { Observable, Subject } from 'rxjs';
import { selectAllCustomers } from './../../../state/parameters/customers/customers.selectors';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WebAppBase } from '../../../base/web-app-base';
import { CustomerDto } from '../../../dto/customer.dto';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { BaseComponent } from '../../components/base/base.component';
import {
  DeleteCustomer,
  GetAllCustomers,
} from '../../../state/parameters/customers/customers.actions';
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
  customer_list_text: string;
  columns: DnColumnDto[];
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private columnsService: ColumnsService) {
    super();
    this.customer_list_text = 'Customer List';
    this.tabsService.setActiveTabName(this.customer_list_text);
  }

  ngOnInit() {
    this.setActionsResults();
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
    this.store.dispatch(DeleteCustomer.action({id:data.Id}));
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        deleteSuccess: DeleteCustomer.actionSuccess,
        deleteFailure: DeleteCustomer.actionFailure,
      },
      {
        deleteSuccess: () => {
          this.displayNotification('Record deleted');
          this.getData();
        },
        deleteFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
      },
      this.destroy$
    );
  }
  //#endregion

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

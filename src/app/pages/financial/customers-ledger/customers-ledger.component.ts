import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DnSelectboxComponent } from '../../components/dn-selectbox/dn-selectbox.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DocumentsViewModel } from '../../../view-models/documents.viewmodel';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { Guid } from 'guid-typescript';
import { DocumentDto } from '../../../dto/document.dto';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import { BaseComponent } from '../../components/base/base.component';
import { GetAllCustomers } from '../../../state/parameters/customers/customers.actions';
import { selectAllCustomers } from '../../../state/parameters/customers/customers.selectors';
import { CustomerDto } from '../../../dto/customer.dto';

@Component({
  selector: 'app-customers-ledger',
  imports: [
    DnSelectboxComponent,
    DnToolbarComponent,
    DnGridComponent,
    CommonModule,
    AsyncPipe,
  ],
  templateUrl: './customers-ledger.component.html',
  styleUrl: './customers-ledger.component.css',
})
export class CustomersLedgerComponent extends BaseComponent implements OnInit {
  customers_ledger_list_text: string = 'Customers Ledger';
  documentsViewModel: DocumentsViewModel;
  dataSource$: Observable<DocumentDto[]>;
  customerId: Guid;
  columns: DnColumnDto[];
  customers$: Observable<CustomerDto[]>;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private columnsService: ColumnsService
  ) {
    super();
    this.documentsViewModel = new DocumentsViewModel(this.http, this.auth);
  }

  ngOnInit(): void {
    this.getLookups();
    this.getColumns();
  }

  getLookups() {
    this.store.dispatch(GetAllCustomers.action());
    this.customers$ = this.store.select(selectAllCustomers);
  }

  onRefreshClicked(e: any) {
    if (this.customerId) {
      this.getData();
    }
  }

  onCustomerChange(e: any) {
    this.customerId = e;
    this.getData();
  }

  getData() {
    this.dataSource$ =
      this.documentsViewModel.GetChargeableDocumentsByCustomerId(
        this.customerId
      );
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.CustomersLedger);
  }

  onDocumentInfoBtnClicked(e: any) {}
}

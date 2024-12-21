import { CustomersViewModel } from './../../../view-models/customers.viewmodel';
import { Component, OnInit } from '@angular/core';
import { DnSelectboxComponent } from '../../components/dn-selectbox/dn-selectbox.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DocumentsViewModel } from '../../../view-models/documents.viewmodel';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-customers-ledger',
    imports: [
        DnSelectboxComponent,
        DnToolbarComponent,
        DnGridComponent,
        CommonModule,
    ],
    templateUrl: './customers-ledger.component.html',
    styleUrl: './customers-ledger.component.css'
})
export class CustomersLedgerComponent implements OnInit {
  customers_ledger_list_text: string = 'Customers Ledger';
  customersViewModel: CustomersViewModel;
  customers: any;
  documentsViewModel: DocumentsViewModel;
  dataSource: any;
  customerId: any;
  columns: any;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.customersViewModel = new CustomersViewModel(this.http, this.auth);
    this.documentsViewModel = new DocumentsViewModel(this.http, this.auth);
  }

  ngOnInit(): void {
    this.customersViewModel.GetAll().subscribe((result: any) => {
      this.customers = result;
    });
    this.getColumns();
  }
  onRefreshClicked(e: any) {}

  onCustomerChange(e: any) {
    this.customerId = e;
    this.getData();
  }

  getData() {
    this.documentsViewModel
      .GetChargeableDocumentsByCustomerId(this.customerId)
      .subscribe((result: any) => {
        this.dataSource = result;
      });
  }

  getColumns() {
    this.columns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'DocumentDateTime',
        DataType: 'datetime',
        Caption: 'Date',
        Visible: true,
        Format: 'dd/MM/yyyy',
      },
      {
        DataField: 'DocumentCode',
        DataType: 'string',
        Caption: 'Code',
      },
      // {
      //   DataField: 'DocumentTypeId',
      //   DataType: 'string',
      //   Caption: 'Type',
      //   Lookup: {
      //     DataSource: this.documentTypesDataSource,
      //     ValueExpr: 'Id',
      //     DisplayExpr: 'Name',
      //   },
      //   Visible:false
      // },
      {
        DataField: 'CustomerId',
        DataType: 'string',
        Caption: 'Customer',
        Lookup: {
          DataSource: this.customers,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      // {
      //   DataField: 'SupplierId',
      //   DataType: 'string',
      //   Caption: 'Supplier',
      //   Lookup: {
      //     DataSource: this.suppliersDataSource,
      //     ValueExpr: 'Id',
      //     DisplayExpr: 'Name',
      //   },

      // },
      // {
      //   DataField: 'DocumentStatusId',
      //   DataType: 'string',
      //   Caption: 'Status',
      //   Lookup: {
      //     DataSource: this.documentStatusesDataSource,
      //     ValueExpr: 'Id',
      //     DisplayExpr: 'Name',
      //   },
      // },

      {
        DataField: 'DocumentTotal',
        DataType: 'number',
        Caption: 'Total',
        DisplayColumnTotal: true,
      },
      // {
      //   DataField: 'buttons',
      //   DataType: 'buttons',
      //   Caption: '',
      // }
    ];
  }
  onDocumentInfoBtnClicked(e: any) {}
}

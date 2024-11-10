import { Component } from '@angular/core';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DocumentsViewModel } from '../../../view-models/documents.viewmodel';
import { CustomersViewModel } from '../../../view-models/customers.viewmodel';
import { ListWithFiltersComponent } from '../../list-with-filters/list-with-filters.component';

@Component({
  selector: 'app-accounts-receivable',
  standalone: true,
  imports: [DnToolbarComponent, DnGridComponent],
  templateUrl: './accounts-receivable.component.html',
  styleUrl: './accounts-receivable.component.css',
})
export class AccountsReceivableComponent {
  accounts_receivable_list_text: string = 'Accounts Receivable';
  documentsViewModel: DocumentsViewModel;
  customersViewModel: CustomersViewModel;
  customersDataSource: any;
  customersDocumentsColumns: any[];
  dataSource: any[] = [];
  columns: any[] = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private dialog: MatDialog
  ) {
    this.documentsViewModel = new DocumentsViewModel(this.http, this.auth);
    this.customersViewModel = new CustomersViewModel(this.http, this.auth);
    this.customersViewModel.GetAll().subscribe((result: any) => {
      this.customersDataSource = result;
      this.getCustomerDocumentsColumns();
    });
  }

  ngOnInit(): void {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.documentsViewModel
      .GetaAccountsReceivableListData()
      .subscribe((result: any) => {
        this.dataSource = result;
      });
  }

  getColumns() {
    this.columns = [
      {
        DataField: 'CustomerName',
        DataType: 'string',
        Caption: 'Customer',
        Visible: true,
      },
      {
        DataField: 'ReceivableTotal',
        DataType: 'number',
        Caption: 'Receivable Total',
        Visible: true,
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  getCustomerDocumentsColumns() {
    this.customersDocumentsColumns = [
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
          DataSource: this.customersDataSource,
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

  onRefreshClicked(e: any) {
    this.getData();
  }

  onInfoBtnClicked(row: any) {
    this.documentsViewModel
      .GetChargeableDocumentsByCustomerId(row.CustomerId)
      .subscribe((result: any) => {
        this.dialog.open(ListWithFiltersComponent, {
          width: '60%',
          height: '80%',
          data: {
            Title: 'Documents List',
            DataSource: result,
            Columns: this.customersDocumentsColumns,
          },
        });
      });
  }
}

import { SuppliersViewModel } from './../../../view-models/suppliers.viewmodel';
import { DocumentsViewModel } from './../../../view-models/documents.viewmodel';
import { Component, OnInit } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ListWithFiltersComponent } from '../../list-with-filters/list-with-filters.component';

@Component({
  selector: 'app-accounts-payable',
  standalone: true,
  imports: [DnToolbarComponent, DnGridComponent],
  templateUrl: './accounts-payable.component.html',
  styleUrl: './accounts-payable.component.css',
})
export class AccountsPayableComponent implements OnInit {
  accounts_payable_list_text: string = 'Accounts Payable';
  dataSource:any[] = [];
  columns:any[] = [];
  documentsViewModel: DocumentsViewModel;
  suppliersViewModel: SuppliersViewModel;
  suppliersDataSource: any;
  supplierDocumentsColumns: any[];

  constructor(private http:HttpClient, private auth:AuthService, private dialog:MatDialog) {
    this.documentsViewModel = new DocumentsViewModel(this.http, this.auth)
    this.suppliersViewModel = new SuppliersViewModel(this.http, this.auth)
    this.suppliersViewModel.GetAll().subscribe((result:any)=>{
      this.suppliersDataSource = result
      this.getSupplierDocumentsColumns()
    })
  }

  ngOnInit(): void {
    this.getData();
    this.getColumns();
  }

  getData(){
    this.documentsViewModel.GetaAccountsPayableListData().subscribe((result:any)=>{
      this.dataSource= result
    })
  }

  getColumns(){
    this.columns=[
      {
        DataField: 'SupplierName',
        DataType: 'string',
        Caption: 'Supplier',
        Visible: true,
      },
      {
        DataField: 'PayableTotal',
        DataType: 'number',
        Caption: 'Payable Total',
        Visible: true,
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ]
  }


  getSupplierDocumentsColumns() {
    this.supplierDocumentsColumns = [
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
        Format:"dd/MM/yyyy"
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
        DataField: 'SupplierId',
        DataType: 'string',
        Caption: 'Supplier',
        Lookup: {
          DataSource: this.suppliersDataSource,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },


      },
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
        DisplayColumnTotal:true
      },
      // {
      //   DataField: 'buttons',
      //   DataType: 'buttons',
      //   Caption: '',
      // }
    ];
  }

  onRefreshClicked(e: any) {
    this.getData()
  }

  onInfoBtnClicked(row:any){
    this.documentsViewModel.GetChargeableDocumentsBySupplierId(row.SupplierId).subscribe((result:any)=>{
      this.dialog.open(ListWithFiltersComponent, {
        width: "50%",
        height: "80%",
        data: {
          Title:'Documents List',
          DataSource: result,
          Columns:this.supplierDocumentsColumns,

        },
      });
    })

  }

}

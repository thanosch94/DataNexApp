import { DocumentTypeGroupEnum } from './../../enums/document-type-group.enum';
import { SuppliersViewModel } from './../../view-models/suppliers.viewmodel';
import { StatusesViewModel } from './../../view-models/statuses.viewmodel';
import { DocumentTypesViewModel } from './../../view-models/document-types.viewmodel';
import { TabsService } from './../../services/tabs.service';
import { AuthService } from './../../services/auth.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgClass } from '@angular/common';
import { CustomerDto } from '../../dto/customer.dto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { WebAppBase } from '../../base/web-app-base';
import { DocumentDto } from '../../dto/document.dto';
import { DocumentsViewModel } from '../../view-models/documents.viewmodel';
import { CdkMenu, CdkMenuItem, CdkContextMenuTrigger } from '@angular/cdk/menu';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Navigation } from '../../base/navigation';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { CustomersViewModel } from '../../view-models/customers.viewmodel';

@Component({
  selector: 'app-documents-list',
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
    CdkContextMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    CommonModule,
    DnToolbarComponent,
    MatTooltipModule,
    DnGridComponent,
  ],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.css',
})
export class DocumentsListComponent implements OnInit {
  dataSource: DocumentDto[];
  customersViewModel: CustomersViewModel;
  documentsViewModel: DocumentsViewModel;
  documentlist_text: string;
  documentType: any;
  documentGroup: any;
  tabsService: TabsService;
  columns: DnColumnDto[];
  documentsTypeViewModel: DocumentTypesViewModel;
  documentTypesDataSource: any;
  customersDataSource: any;
  rowData: any;
  statusesViewModel: StatusesViewModel;
  documentStatusesDataSource: any;
  suppliersViewModel: SuppliersViewModel;
  suppliersDataSource: any;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
  ) {
    this.tabsService = new TabsService(route);
    this.documentsViewModel = new DocumentsViewModel(this.http, this.auth);
    this.statusesViewModel = new StatusesViewModel(this.http, this.auth);
    this.suppliersViewModel = new SuppliersViewModel(this.http, this.auth);
    this.documentsTypeViewModel = new DocumentTypesViewModel(
      this.http,
      this.auth
    );
    this.customersViewModel = new CustomersViewModel(this.http, this.auth);
    this.documentlist_text = 'Document List';
    this.documentsTypeViewModel.GetAll().subscribe((result: any) => {
      this.documentTypesDataSource = result;
      this.customersViewModel.GetAll().subscribe((result: any) => {
        this.customersDataSource = result;
        this.statusesViewModel.GetAll().subscribe((result:any)=>{
          this.documentStatusesDataSource =result
          this.suppliersViewModel.GetAll().subscribe((result:any)=>{
            this.suppliersDataSource =result
            this.getColumns();

          })

        })

      });
    });
    this.route.queryParams.subscribe((params: any) => {
      this.documentGroup = params['Group'];
      this.documentType = params['Type'];
      this.tabsService.setTabsData([
        { Group: this.documentGroup },
        { Type: this.documentType },
      ]);
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.documentsViewModel
      .GetByDocumentGroup(this.documentGroup)
      .subscribe((result: any) => {
        if (
          this.documentType == 'SalesDocuments' ||
          this.documentType == 'PurchaseDocuments' ||
          this.documentType == 'InventoryAdjustments'
        ) {
          this.dataSource = result;
        } else if (this.documentType == 'Invoices-Receipts') {
          let invoicesReceiptDocument = result.filter(
            (x: any) =>
              x.DocumentTypeId == WebAppBase.Invoice ||
              x.Id == WebAppBase.Receipt
          );
          this.dataSource = invoicesReceiptDocument;
        } else if (this.documentType == 'SupplierInvoices') {
          let purchaseInvoicesDocument = result.filter(
            (x: any) => x.DocumentTypeId == WebAppBase.PurchaseInvoice
          );

          this.dataSource = purchaseInvoicesDocument;
        }
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
        Format:"dd/MM/yyyy"
      },
      {
        DataField: 'DocumentCode',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'DocumentTypeId',
        DataType: 'string',
        Caption: 'Type',
        Lookup: {
          DataSource: this.documentTypesDataSource,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
        Visible:false
      },
      {
        DataField: 'CustomerId',
        DataType: 'string',
        Caption: 'Customer',
        Lookup: {
          DataSource: this.customersDataSource,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
        Visible:this.documentGroup ==DocumentTypeGroupEnum.Sales
      },
      {
        DataField: 'SupplierId',
        DataType: 'string',
        Caption: 'Supplier',
        Lookup: {
          DataSource: this.suppliersDataSource,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
        Visible:this.documentGroup ==DocumentTypeGroupEnum.Purchasing

      },
      {
        DataField: 'DocumentStatusId',
        DataType: 'string',
        Caption: 'Status',
        Lookup: {
          DataSource: this.documentStatusesDataSource,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },


      {
        DataField: 'DocumentTotal',
        DataType: 'number',
        Caption: 'Total',
        DisplayColumnTotal:true
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      }
    ];
  }
  // applyFilter(e: any) {
  //   const filterValue = (e.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  getRowData(rowData: any) {
    this.rowData = rowData;
  }


  editDocument(document: DocumentDto) {
    WebAppBase.data = document.Id;

    this.router.navigate(['document-edit'], {
      queryParams: {
        docCode: document.DocumentTypeName + document.DocumentNumber,
      },
    });
  }

  onTransformDocumentClicked(e: any, row: any) {}

  onCancelDocumentClicked(e: any, row: any) {}

  onInsertClicked(e: any) {
    Navigation.data = this.documentGroup;
    this.router.navigate(['document-edit'], { queryParams: {} });
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onRowEditing(e:any){
    WebAppBase.data = e.Id;

    this.router.navigate(['document-edit'], {
      queryParams: {
        docCode: e.DocumentTypeName + e.DocumentNumber,
      },
    });
  }

  onTransformedClicked(e:any){

  }
}

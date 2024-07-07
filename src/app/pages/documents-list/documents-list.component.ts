import { TabsService } from './../../services/tabs.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  ],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.css',
})
export class DocumentsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('documentListTable') documentListTable: MatTable<DocumentDto>;
  displayedColumns: string[] = [
    'DocumentTypeName',
    'DocumentNumber',
    'CustomerName',
    'DocumentTotal',
    'edit',
  ];
  dataSource: MatTableDataSource<CustomerDto>;
  rowData: any;
  customersViewModel: DocumentsViewModel;
  documentsViewModel: DocumentsViewModel;
  documentlist_text: string;
  documentType: any;
  documentGroup: any;
  tabsService: TabsService;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tabsService = new TabsService(route);
    this.documentsViewModel = new DocumentsViewModel(this.http, this.auth);
    this.documentlist_text = 'Document List';

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
          this.documentType =='InventoryAdjustments'
        ) {
          this.dataSource = new MatTableDataSource(result);
        } else if (this.documentType == 'Invoices-Receipts') {
          let invoicesReceiptDocument = result.filter(
            (x: any) =>
              x.DocumentTypeId == WebAppBase.Invoice ||
              x.Id == WebAppBase.Receipt
          );
          this.dataSource = new MatTableDataSource(invoicesReceiptDocument);
        } else if (this.documentType == 'SupplierInvoices') {
          let purchaseInvoicesDocument = result.filter(
            (x: any) => x.DocumentTypeId == WebAppBase.PurchaseInvoice
          );

          this.dataSource = new MatTableDataSource(purchaseInvoicesDocument);
        }

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
  getRowData(rowData: any) {
    this.rowData = rowData;
  }
  createNewDocument(id: number): DocumentDto {
    let document = new DocumentDto();
    return document;
  }

  addDocument() {
    Navigation.data = this.documentGroup;
    this.router.navigate(['document-edit']);
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
    this.documentListTable.renderRows();
  }
}

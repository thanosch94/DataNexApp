import { TabsService } from './../../services/tabs.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { WebAppBase } from '../../base/web-app-base';
import { DocumentDto } from '../../dto/document.dto';
import { DocumentsViewModel } from '../../view-models/documents.viewmodel';
import { CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Navigation } from '../../base/navigation';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { ColumnsService } from '../../services/columns.service';
import { GridColumns } from '../../base/grid-columns';

@Component({
  selector: 'app-documents-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
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
  documentsViewModel: DocumentsViewModel;
  documentlist_text: string;
  documentType: any;
  documentGroup: any;
  tabsService: TabsService;
  columns: DnColumnDto[];
  rowData: any;
  gridSelection: any;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private columnsService: ColumnsService
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
      this.getColumns();
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
    this.columns = this.columnsService.getColumns(GridColumns.DocumentsList, {
      documentGroup: this.documentGroup,
    });
  }

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

  onRowEditing(e: any) {
    WebAppBase.data = e.Id;

    this.router.navigate(['document-edit'], {
      queryParams: {
        docCode: e.DocumentTypeName + e.DocumentNumber,
      },
    });
  }

  onTransformedClicked(e: any) {
    let uniqueCustomers: any[] = [];
    this.gridSelection.filter((customer: any) => {
      if (uniqueCustomers.includes(customer.CustomerId)) {
        return false;
      } else {
        uniqueCustomers.push(customer.CustomerId);
        return true;
      }
    });
    if (uniqueCustomers?.length > 1) {
      alert('Cannot transform');
    } else {
      //alert('Successfully transformed');
    }
  }

  onRowSelectionChanged(data: any) {
    this.gridSelection = data;
  }
}

import { AuthService } from './../../services/auth.service';
import { DocumentProductsViewModel } from './../../view-models/document-products.viewmodel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { DocumentProductDto } from '../../dto/document-product.dto';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { WebAppBase } from '../../base/web-app-base';
import { SalesViews } from '../../enums/sales-views.enum';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'list-with-filters',
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
    MatToolbarModule,
    CommonModule,
    MatDialogActions,
    MatDialogModule,
    DnToolbarComponent,
    MatTooltipModule
  ],
  templateUrl: './list-with-filters.component.html',
  styleUrl: './list-with-filters.component.css',
})
export class ListWithFiltersComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'DocumentDateString',
    'DocumentCode',
    'CustomerName',
    'Quantity',
    'TotalPrice',
    'info',
  ];
  dataSource: MatTableDataSource<DocumentProductDto>;
  documentProductsViewModel: DocumentProductsViewModel;
  entity_title_text: string;
  productId: any;
  productName: any;
  isDialog: boolean;
  view: any;
  constructor(
    private http: HttpClient,
    private auth:AuthService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.documentProductsViewModel = new DocumentProductsViewModel(this.http, this.auth);
    this.entity_title_text =data.product.Sku+' - '+ data.product.ProductName;
    if(data){
      this.productId = data.product.ProductId;
      this.productName = data.product.ProductName
      this.view = data.view
      this.isDialog=true
    }else{
      this.productId = WebAppBase.data;
      this.isDialog=false

    }
    // Assign the data to the data source for the table to render
  }

  ngAfterViewInit() {
    if(this.view == SalesViews.PendingSalesOrders){
      this.documentProductsViewModel.GetPendingOrdersForProductId(this.productId).subscribe((result: any) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }

  }

  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onInfoClicked(documentId: Guid) {
    //Open Dialog and pass documentId
  }
  onCloseClicked(e: any) {}
}

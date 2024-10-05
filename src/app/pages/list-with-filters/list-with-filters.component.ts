import { AuthService } from './../../services/auth.service';
import { DocumentProductsViewModel } from './../../view-models/document-products.viewmodel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
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
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';

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
    MatTooltipModule,
    DnGridComponent
  ],
  templateUrl: './list-with-filters.component.html',
  styleUrl: './list-with-filters.component.css',
})
export class ListWithFiltersComponent implements OnInit {
  dataSource: MatTableDataSource<DocumentProductDto>;
  documentProductsViewModel: DocumentProductsViewModel;
  entity_title_text: string ;
  productId: any;
  productName: any;
  isDialog: boolean;
  view: any;
  columns:any[]
  constructor(
    private http: HttpClient,
    private auth:AuthService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.documentProductsViewModel = new DocumentProductsViewModel(this.http, this.auth);

    if(data){
      this.isDialog=true
      this.dataSource = data.DataSource
      this.columns = data.Columns
      this.entity_title_text = data.Title
    }else{
      this.isDialog=false

    }
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {

  }


  onInfoClicked(documentId: Guid) {
    //Open Dialog and pass documentId
  }
  onCloseClicked(e: any) {}


  onInfoBtnClicked(e:any){

  }
}

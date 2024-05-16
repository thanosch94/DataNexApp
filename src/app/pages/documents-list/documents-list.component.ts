import { AuthService } from './../../services/auth.service';
import { CustomersViewModel } from '../../view-models/customers.viewmodel';
import { AfterViewInit, Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgClass } from '@angular/common';
import { CustomerDto } from '../../dto/customer.dto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { WebAppBase } from '../../base/web-app-base';
import { DocumentDto } from '../../dto/document.dto';
import { DocumentsViewModel } from '../../view-models/documents.viewmodel';
import {CdkMenu, CdkMenuItem, CdkContextMenuTrigger} from '@angular/cdk/menu';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';

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
    DnToolbarComponent
  ],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.css',
})
export class DocumentsListComponent implements OnInit{
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
  rowData:any;
  customersViewModel: DocumentsViewModel;
  documentsViewModel: DocumentsViewModel;
  documentlist_text: string;
  constructor(private http: HttpClient, private auth:AuthService,private router: Router) {
    this.documentsViewModel = new DocumentsViewModel(this.http, this.auth);
    this.documentlist_text = "Document List"
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
   this.getData();;
  }

  getData(){
    this.documentsViewModel.GetAll().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result);
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
getRowData(rowData:any){
  this.rowData=rowData
}
  createNewDocument(id: number): DocumentDto {
    let document = new DocumentDto();
    // const name =
    //   NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    //   ' ' +
    //   NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    //   '.';

    return document;
  }

  addDocument() {
    this.router.navigate(['document-edit']);
  }

  editDocument(document: DocumentDto) {
    WebAppBase.data = document.Id;
    this.router.navigate(['document-edit']);
  }
  deleteDocument(element: any) {}

  onTransformDocumentClicked(e:any, row:any){

  }
  onCancelDocumentClicked(e:any, row:any){

  }
  onInsertClicked(e:any){
    this.router.navigate(['document-edit'])
  }

  onRefreshClicked(e:any){
    this.getData();
    this.documentListTable.renderRows()
  }
}

import { CustomersViewModel } from '../../view-models/customers.viewmodel';
import { AfterViewInit, Component, NgModule, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { CustomerDto } from '../../dto/customer.dto';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { WebAppBase } from '../../base/web-app-base';
import { DocumentDto } from '../../dto/document.dto';
import { DocumentsViewModel } from '../../view-models/documents.viewmodel';
@Component({
  selector: 'app-orders-list',
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
  ],
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.css',
})
export class DocumentsListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  customersViewModel: DocumentsViewModel;
  documentsViewModel: DocumentsViewModel;
  constructor(private http: HttpClient, private router: Router) {
    this.documentsViewModel = new DocumentsViewModel(this.http);
    // Assign the data to the data source for the table to render
  }

  ngAfterViewInit() {
    this.documentsViewModel.GetAll().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = [
    'DocumentTypeId',
    'DocumentNumber',
    'CustomerId',
    'DocumentTotal',
    'edit',
  ];
  dataSource: MatTableDataSource<CustomerDto>;
  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    this.router.navigate(['customer-edit']);
  }

  editDocument(document: DocumentDto) {
    debugger;
    WebAppBase.data = document.Id;
    this.router.navigate(['customer-edit']);
  }
  deleteDocument(element: any) {}
}

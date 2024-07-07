import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsViewModel } from '../../../view-models/products.viewmodel';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { ProductDto } from '../../../dto/product.dto';
import { WebAppBase } from '../../../base/web-app-base';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-products-list',
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
    DnToolbarComponent,
    MatTooltipModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('productsTable') productsTable: MatTable<ProductDto>;

  displayedColumns: string[] = ['Sku', 'Name', 'Price', 'Brand', 'buttons'];
  productsViewModel: ProductsViewModel;
  products_list_text: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.productsViewModel = new ProductsViewModel(this.http, this.auth);
    this.products_list_text = 'Products List';
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.productsViewModel.GetAll().subscribe((result: any) => {
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

  addProduct(e: any) {
    this.router.navigate(['product-edit']);
  }

  onInsertClicked(e: any) {
    this.router.navigate(['product-edit']);
  }

  editProduct(product: any) {
    WebAppBase.data = product.Id;
    this.router.navigate(['product-edit']);
  }

  deleteProduct(data: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '320px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.deleteItem(data);
      } else {
      }
    });
  }

  deleteItem(data: any) {
    this.productsViewModel.DeleteById(data.Id).subscribe({
      next: (result) => {
        this.getData();

        this._snackBar.open('Record deleted', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
      },
      error: (err) => {
        const dialog = this.dialog.open(DnAlertComponent, {
          data: {
            Title: 'Message',
            Message: err.error.innerExceptionMessage,
          },
        });
      },
    });
  }

  onRefreshClicked(e: any) {
    this.getData();
    this.productsTable.renderRows();
  }
}

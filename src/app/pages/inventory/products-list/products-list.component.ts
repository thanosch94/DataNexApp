import { ProductsService } from './../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsViewModel } from '../../../view-models/products.viewmodel';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { WebAppBase } from '../../../base/web-app-base';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { AuthService } from '../../../services/auth.service';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { BrandsViewModel } from '../../../view-models/brands.viewmodel';
import { Store } from '@ngrx/store';
import { getAllProducts } from '../../../state/products/products.actions';
import { AsyncPipe } from '@angular/common';
import { selectAllProducts } from '../../../state/products/products.selectors';

@Component({
  selector: 'app-products-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    DnToolbarComponent,
    MatTooltipModule,
    DnGridComponent,
    AsyncPipe,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  dataSource: any;
  columns: any[];
  productsViewModel: ProductsViewModel;
  products_list_text: string;
  brandsViewModel: BrandsViewModel;
  brands: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private productsService: ProductsService,
    private store: Store
  ) {
    this.productsViewModel = new ProductsViewModel(this.productsService);
    this.brandsViewModel = new BrandsViewModel(this.http, this.auth);
    this.brandsViewModel.GetAll().subscribe((result: any) => {
      this.brands = result;
      this.getColumns();
    });
    this.products_list_text = 'Products List';
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.store.dispatch(getAllProducts());

    this.dataSource = this.store.select(selectAllProducts);
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
        DataField: 'Sku',
        DataType: 'string',
        Caption: 'Sku',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },

      {
        DataField: 'RetailPrice',
        DataType: 'number',
        Caption: 'Price',
      },
      {
        DataField: 'BrandName',
        DataType: 'string',
        Caption: 'Brand',
      },
      // {
      //   DataField: 'Brand',
      //   DataType: 'string',
      //   Caption: 'Brand',
      //   Lookup: {
      //     DataSource: this.brands,
      //     ValueExpr: 'Id',
      //     DisplayExpr: 'Name',
      //   },
      // },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
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
  }
}

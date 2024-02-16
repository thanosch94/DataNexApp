import { ProductSizesViewModel } from './../../view-models/product-sizes.viewmodel';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductDto } from '../../dto/product.dto';
import { ProductsViewModel } from '../../view-models/products.viewmodel';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebAppBase } from '../../base/web-app-base';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ProductBarcodesViewModel } from '../../view-models/product-barcodes.viewmodel';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
    CdkTextareaAutosize,
    TextFieldModule,
    MatButtonModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatTableModule,
    MatSortHeader
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  product = new ProductDto();
  product_text: string;
  productsViewModel: ProductsViewModel;
  productId: any;
  barcodesDataSource:any;
  productBarcodesViewModel: ProductBarcodesViewModel;
  displayedColumns=[
    'Barcode',
    'ProductId',
    'SizeId'
  ]
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _ngZone: NgZone
  ) {
    this.productsViewModel = new ProductsViewModel(this.http);
    this.productBarcodesViewModel =new ProductBarcodesViewModel(this.http)
    this.productId = WebAppBase.data;
  }

  ngOnInit() {
    if (this.productId) {
      this.product_text = 'Product Edit';

      this.productsViewModel
        .GetById(this.productId)
        .subscribe((result: any) => {
          result as ProductDto;
          this.product = result;
          this.productBarcodesViewModel.GetByProductId(this.productId).subscribe((result:any)=>{
            this.barcodesDataSource = result
          })
        });
    } else {
      this.product_text = 'New Product';
      this.product = new ProductDto();
    }
  }

  onCloseClicked(e: any) {
    this.router.navigate(['products-list']);
  }

  onDeleteClicked(e: any) {}

  onSaveClicked(e: any) {
    if (this.product.Id) {
      this.productsViewModel
        .UpdateDto(this.product)
        .subscribe((result: any) => {
          if (result) {
            this._snackBar.open('Η εγγραφή ενημερώθηκε', '', {
              duration: 1000,
              panelClass: 'green-snackbar',
            });
          }
        });
    } else {
      this.productsViewModel
        .InsertDto(this.product)
        .subscribe((result: any) => {
          this.product = result;
          this._snackBar.open('Η εγγραφή καταχωρήθηκε', '', {
            duration: 1000,
            panelClass: 'green-snackbar',
          });
        });
    }
  }

  ngOnDestroy() {
    WebAppBase.data = undefined;
  }

  addProductBarcode(e:any){

  }
  editProductBarcode(data:any){

  }

  deleteProductBarcode(data:any){

  }
}

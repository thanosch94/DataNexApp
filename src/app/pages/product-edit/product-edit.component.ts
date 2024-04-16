import { ProductBarcodeDto } from './../../dto/product-barcode.dto';
import { ProductSizesViewModel } from './../../view-models/product-sizes.viewmodel';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  NgModule,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductDto } from '../../dto/product.dto';
import { ProductsViewModel } from '../../view-models/products.viewmodel';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebAppBase } from '../../base/web-app-base';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { map, startWith, take } from 'rxjs/operators';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { ProductBarcodesViewModel } from '../../view-models/product-barcodes.viewmodel';
import { DnPopupComponent } from '../components/dn-popup/dn-popup.component';
import { Observable } from 'rxjs';
import { ProductSizeDto } from '../../dto/product-size.dto';
import { MatTabsModule } from '@angular/material/tabs';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';

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
    MatSortHeader,
    DnPopupComponent,
    MatTabsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('matTable') table: MatTable<ProductBarcodeDto>;
  @ViewChild('optionSelected') optionSelected: MatOption;
  sizeControl = new FormControl('');

  product = new ProductDto();
  product_text: string;
  productsViewModel: ProductsViewModel;
  productId: any;
  barcodesDataSource: MatTableDataSource<ProductBarcodeDto>;
  productBarcodesViewModel: ProductBarcodesViewModel;
  filteredSizes: Observable<ProductSizeDto[]>;
  displayedColumns = ['Barcode', 'SizeId', 'buttons'];
  productSizesViewModel: ProductSizesViewModel;
  productsSizes = new Array<ProductSizeDto>();
  newBarcodeLine: any;
  selected: any;
  isEditable: boolean;
  isAlertVisible: boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _ngZone: NgZone,
    private ref: ChangeDetectorRef
  ) {
    this.productsViewModel = new ProductsViewModel(this.http);
    this.productBarcodesViewModel = new ProductBarcodesViewModel(this.http);
    this.productId = WebAppBase.data;
    this.productSizesViewModel = new ProductSizesViewModel(this.http);
  }

  ngOnInit() {
    if (this.productId) {
      this.product_text = 'Product Edit';

      this.productsViewModel
        .GetById(this.productId)
        .subscribe((result: any) => {
          result as ProductDto;
          this.product = result;
          this.getProductBarcodesData();
        });
      this.productSizesViewModel.GetAll().subscribe((result: any) => {
        this.productsSizes = result as ProductSizeDto[];
      });
    } else {
      this.product_text = 'New Product';
      this.product = new ProductDto();
    }

    this.filteredSizes = this.sizeControl.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => this.sizefilter(value || ''))
    );
  }

  private getProductBarcodesData() {
    this.productBarcodesViewModel
      .GetByProductId(this.productId)
      .subscribe((result: any) => {
        this.barcodesDataSource = new MatTableDataSource(result);
      });
  }
  private sizefilter(value: string): ProductSizeDto[] {
    const filterValue = value.toLowerCase();
    return this.productsSizes.filter((size: ProductSizeDto) =>
      size.Name.toLowerCase().includes(filterValue)
    );
  }
  onCloseClicked(e: any) {
    this.router.navigate(['products-list']);
  }

  onDeleteClicked(e: any) {
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
        this.deleteItem(this.product);
      } else {
      }
    });
  }
  deleteItem(data: any) {
    this.productsViewModel.DeleteById(data.Id).subscribe({
      next: (result) => {
        this._snackBar.open('Η εγγραφή έχει διαγραφεί', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
        this.router.navigate(['products-list']);
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

  addProductBarcode(e: any) {
    if (!this.barcodesDataSource.data) {
      this.barcodesDataSource.data = new Array<ProductBarcodeDto>();
    }
    this.newBarcodeLine = new ProductBarcodeDto();
    this.isEditable = true; //Used for new Line
    this.newBarcodeLine.Barcode = '';
    this.newBarcodeLine.IsEditable = true;
    this.newBarcodeLine.ProductId = this.productId;
    this.barcodesDataSource.data.unshift(this.newBarcodeLine);
    this.table.renderRows();
  }
  editProductBarcode(data: any, index: number) {
    this.barcodesDataSource.data[index].IsEditable = true;
  }
  saveProductBarcode(data: any, index: number) {
    this.barcodesDataSource.data[index].IsEditable = false;
    this.isEditable = false;

    this.newBarcodeLine.ProductId = data.ProductId;
    this.productBarcodesViewModel.InsertDto(data).subscribe((result: any) => {
      if (result?.Id) {
        this.getProductBarcodesData();
      } else {
        this.barcodesDataSource.data.shift();

        this.table.renderRows();
      }
    });
  }
  deleteProductBarcode(data: any, index: number) {
    this.productBarcodesViewModel
      .DeleteById(data.Id)
      .subscribe((result: any) => {
        this.getProductBarcodesData();
      });
  }

  onSizeSelectionChanged(data: any) {
    this.newBarcodeLine.SizeId = data.Id;
  }

  onBarcodeChanged(data: any) {
    this.newBarcodeLine.Barcode = data.target.value;
  }
}

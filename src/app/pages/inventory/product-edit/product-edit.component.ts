import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  Inject,
  NgModule,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  isDevMode,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { map, startWith, take } from 'rxjs/operators';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Guid } from 'guid-typescript';
import { firstValueFrom, Observable } from 'rxjs';
import { WebAppBase } from '../../../base/web-app-base';
import { BrandDto } from '../../../dto/brand.dto';
import { ProductBarcodeDto } from '../../../dto/product-barcode.dto';
import { ProductSizeDto } from '../../../dto/product-size.dto';
import { ProductDto } from '../../../dto/product.dto';
import { AuthService } from '../../../services/auth.service';
import { TabsService } from '../../../services/tabs.service';
import { BrandsViewModel } from '../../../view-models/brands.viewmodel';
import { ProductBarcodesViewModel } from '../../../view-models/product-barcodes.viewmodel';
import { ProductSizesViewModel } from '../../../view-models/product-sizes.viewmodel';
import { ProductsViewModel } from '../../../view-models/products.viewmodel';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { DnPopupComponent } from '../../components/dn-popup/dn-popup.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { VatClassesViewModel } from '../../../view-models/vat-classes.viewmodel';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductsService } from '../../../services/products.service';
import { Store } from '@ngrx/store';
import {
  insertProduct,
  insertProductSuccess,
  loadProductById,
  updateProduct,
  updateProductSuccess,
} from '../../../state/products/products.actions';
import { selectProductById } from '../../../state/products/products.selectors';
import { DnSelectboxComponent } from '../../components/dn-selectbox/dn-selectbox.component';
import { DnTextboxComponent } from '../../components/dn-textbox/dn-textbox.component';
import { DnNumberBoxComponent } from '../../components/dn-number-box/dn-number-box.component';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'product-edit',
  imports: [
    FormsModule,
    MatFormFieldModule,
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
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    DnToolbarComponent,
    AsyncPipe,
    DnSelectboxComponent,
    DnTextboxComponent,
    DnNumberBoxComponent,
  ],
  providers: [TabsService],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('matTable') table: MatTable<ProductBarcodeDto>;
  @ViewChild('optionSelected') optionSelected: MatOption;
  sizeControl = new FormControl('');
  brandControl = new FormControl('');
  product: any;
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
  isDialog: boolean;
  noImgPath: string;
  sizeName: any;
  brandsViewModel: BrandsViewModel;
  brands: any;
  previousTabName: string;
  vatClassName: any;
  vatClassesViewModel: VatClassesViewModel;
  vatClasses: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private tabsService: TabsService,
    private ref: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private productsService: ProductsService,
    private store: Store,
    private actions$: Actions,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productsViewModel = new ProductsViewModel(this.productsService);
    this.productBarcodesViewModel = new ProductBarcodesViewModel(
      this.http,
      this.auth
    );
    this.productSizesViewModel = new ProductSizesViewModel(
      this.http,
      this.auth
    );
    this.vatClassesViewModel = new VatClassesViewModel(this.http, this.auth);
    this.brandsViewModel = new BrandsViewModel(this.http, this.auth);


    //If opens from dialog
    if (data) {
      this.productId = data.product.ProductId;
      this.isDialog = true;
    } else {
      this.productId = WebAppBase.data;
      WebAppBase.data = undefined;
      this.isDialog = false;
    }

    this.noImgPath = './assets/images/no-img.jpg';
    this.getLookups();
  }

  ngOnInit() {
    this.setInsertProductSuccessActionResult();
    this.setUpdateProductSuccessActionResult();
    this.getData();
  }

  setUpdateProductSuccessActionResult() {
    this.actions$
      .pipe(ofType(updateProductSuccess), take(1))
      .subscribe((result: any) => {
        this.previousTabName = this.product_text.toString();
        this.product = result.product;
        this.product_text = this.product.Sku + ' - ' + this.product.Name;
        this.tabsService.setTabNameByOldName(
          this.product_text,
          this.previousTabName
        );
        this._snackBar.open('Record updated', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
      });
  }

  setInsertProductSuccessActionResult() {
    this.actions$
      .pipe(ofType(insertProductSuccess), take(1))
      .subscribe((result: any) => {
        this.product = result.product;
        this.productId = this.product.Id;
        this.previousTabName = this.product_text.toString();
        this.product_text = this.product.Sku + ' - ' + this.product.Name;
        this.tabsService.setTabNameByOldName(
          this.product_text,
          this.previousTabName
        );
        this.getData()
        this._snackBar.open('Record inserted', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
      });
  }

  async getLookups() {
    let obs1 = this.brandsViewModel.GetAll();
    this.brands = await firstValueFrom(obs1);

    let obs2 = this.vatClassesViewModel.GetAll();
    this.vatClasses = await firstValueFrom(obs2);

    this.ref.detectChanges();
  }

  getData() {
    if (this.productId) {
      this.store.dispatch(loadProductById({ id: this.productId }));
      this.store
        .select(selectProductById(this.productId))
        .subscribe((product) => {
          this.product = { ...product } as ProductDto;
          this.product_text = this.product.Sku + ' - ' + this.product.Name;
          this.tabsService.setTabName(
            this.product.Sku + ' - ' + this.product.Name
          );

          this.getProductBarcodesData();

          this.productSizesViewModel.GetAll().subscribe((result: any) => {
            this.productsSizes = result as ProductSizeDto[];
          });
        });
    } else {
      this.product_text = 'New Product';
      this.product = new ProductDto();
      this.tabsService.setTabName(this.product_text);
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

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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
        this._snackBar.open('Record deleted', '', {
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
    if (this.product.Id != null) {
      this.store.dispatch(updateProduct({ dto: this.product }));
    } else {
      this.store.dispatch(insertProduct({ dto: this.product }));
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
    if (!this.barcodesDataSource.data.some((x) => x.IsEditable == true)) {
      this.ref.detectChanges();
      this.barcodesDataSource.data.unshift(this.newBarcodeLine);
      this.sizeControl.reset();

      this.table.renderRows();
    } else {
    }
  }

  editProductBarcode(data: any, index: number) {
    this.barcodesDataSource.data[index].IsEditable = true;
  }

  stopEditingProductBarcodes(data: any, index: number) {
    if (data.Id) {
      this.barcodesDataSource.data[index].IsEditable = false;
      this.table.renderRows();
      this.getProductBarcodesData();
    } else {
      this.barcodesDataSource.data.shift();
      this.table.renderRows();
    }
  }
  saveProductBarcode(data: any, index: number) {
    if (data.Id) {
      this.productBarcodesViewModel.UpdateDto(data).subscribe({
        next: (result) => {
          this.barcodesDataSource.data[index].IsEditable = false;
          this.table.renderRows();
        },
        error: (err) => {
          const dialog = this.dialog.open(DnAlertComponent, {
            data: {
              Title: 'Message',
              Message: err.error,
            },
          });
        },
      });
    } else {
      this.newBarcodeLine.ProductId = data.ProductId;
      this.productBarcodesViewModel.InsertDto(data).subscribe({
        next: (result: any) => {
          if (result?.Id) {
            this.getProductBarcodesData();
            this.barcodesDataSource.data[index].IsEditable = false;
            this.isEditable = false;
          } else {
            this.barcodesDataSource.data.shift();

            this.table.renderRows();
          }
        },
        error: (err) => {
          const dialog = this.dialog.open(DnAlertComponent, {
            data: {
              Title: 'Message',
              Message: err.error,
            },
          });
        },
      });
    }
    this.sizeControl.reset();
  }
  deleteProductBarcode(data: any, index: number) {
    let editRow = this.barcodesDataSource.data.find(
      (x) => x.IsEditable == true
    );
    let editRowIndex = -1; //False index
    if (editRow != null) {
      editRowIndex = this.barcodesDataSource.data.indexOf(editRow);
      if (index == editRowIndex) {
        if (data.Id) {
          this.doDelete(data.Id);
        } else {
          this.barcodesDataSource.data.shift();
          this.table.renderRows();
        }
      }
    } else {
      if (data.Id) {
        this.doDelete(data.Id);
      }
    }
  }

  doDelete(id: Guid) {
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
        this.productBarcodesViewModel
          .DeleteById(id)
          .subscribe((result: any) => {
            this.getProductBarcodesData();
          });
      }
    });
  }

  onSizeSelectionChanged(data: any) {
    this.newBarcodeLine.SizeId = data.Id;
    this.filteredSizes = this.sizeControl.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => this.sizefilter(value || ''))
    );
    this.table.renderRows();

    this.sizeName = data.Name;
  }

  onBarcodeChanged(data: any) {
    this.newBarcodeLine.Barcode = data.target.value;
  }

  onRefreshClicked(e: any) {
    this.getData();
  }
}

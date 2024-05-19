import { BrandsViewModel } from './../../view-models/brands.viewmodel';
import { ProductBarcodeDto } from './../../dto/product-barcode.dto';
import { ProductSizesViewModel } from './../../view-models/product-sizes.viewmodel';
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
import { ProductDto } from '../../dto/product.dto';
import { ProductsViewModel } from '../../view-models/products.viewmodel';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogModule,
} from '@angular/material/dialog';
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
import { TabsService } from '../../services/tabs.service';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { AuthService } from '../../services/auth.service';
import { Guid } from 'guid-typescript';
import { BrandDto } from '../../dto/brand.dto';

@Component({
  selector: 'product-edit',
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
    MatDialogActions,
    MatButtonModule,
    MatDialogModule,
    DnToolbarComponent,
    AsyncPipe,
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
  isDialog: boolean;
  noImgPath: string;
  sizeName: any;
  brandsViewModel: BrandsViewModel;
  brands: any;
  filteredBrands: Observable<BrandDto[]>;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private tabsService: TabsService,
    private ref: ChangeDetectorRef,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productsViewModel = new ProductsViewModel(this.http, this.auth);
    this.productBarcodesViewModel = new ProductBarcodesViewModel(
      this.http,
      this.auth
    );
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
    this.productSizesViewModel = new ProductSizesViewModel(
      this.http,
      this.auth
    );
    //if(isDevMode()){
    //  this.noImgPath = "../assets/images/no-img.jpg"
    //}else{
    this.noImgPath = './assets/images/no-img.jpg';

    // }
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.brandsViewModel.GetAll().subscribe((result: any) => {
      this.brands = result as Array<BrandDto>;

      this.filteredBrands = this.brandControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._brandsfilter(value || ''))
      );
    });
    if (this.productId) {
      this.productsViewModel
        .GetById(this.productId)
        .subscribe((result: any) => {
          result as ProductDto;
          this.product = result;
          this.product_text = this.product.Sku + ' - ' + this.product.Name;

          this.tabsService.setTabName(
            this.product.Sku + ' - ' + this.product.Name
          );

          this.getProductBarcodesData();
        });
      this.productSizesViewModel.GetAll().subscribe((result: any) => {
        this.productsSizes = result as ProductSizeDto[];
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
  private sizefilter(value: string): ProductSizeDto[] {
    const filterValue = value.toLowerCase();
    return this.productsSizes.filter((size: ProductSizeDto) =>
      size.Name.toLowerCase().includes(filterValue)
    );
  }

  private _brandsfilter(value: string): BrandDto[] {
    const filterValue = value.toLowerCase();
    return this.brands.filter((brand: ProductDto) =>
      brand.Name.toLowerCase().includes(filterValue)
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
    this.product.Id = this.productId;
    if (this.product.Id != null && this.product.Id != Guid.parse(Guid.EMPTY)) {
      this.productsViewModel
        .UpdateDto(this.product)
        .subscribe((result: any) => {
          if (result) {
            this.product = result;
            this.product_text =this.product.Sku + ' - ' + this.product.Name
            this.tabsService.setTabName(this.product_text)
            this.ref.detectChanges()

            this._snackBar.open('Record updated', '', {
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
          this._snackBar.open('Record inserted', '', {
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
    if (!this.barcodesDataSource.data.some((x) => x.IsEditable == true)) {
      this.ref.detectChanges();
      this.barcodesDataSource.data.unshift(this.newBarcodeLine);
      this.sizeControl.reset();

      this.table.renderRows();
    } else {
    }
  }

  onProductBrandSelection(value: string) {
    let selectedBrand = this.brands.find(
      (brand: BrandDto) => brand.Name == value
    );

    if (selectedBrand) {
      this.product.BrandId = selectedBrand.Id;
      this.product.BrandName = selectedBrand.Name;
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

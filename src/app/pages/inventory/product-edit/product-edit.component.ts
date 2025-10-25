import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
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
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Guid } from 'guid-typescript';
import { Observable, Subject } from 'rxjs';
import { ProductBarcodeDto } from '../../../dto/product-barcode.dto';
import { ProductSizeDto } from '../../../dto/product-size.dto';
import { ProductDto } from '../../../dto/product.dto';
import { AuthService } from '../../../services/auth.service';
import { TabsService } from '../../../services/tabs.service';
import { ProductBarcodesViewModel } from '../../../view-models/product-barcodes.viewmodel';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  DeleteProduct,
  GetProductById,
  InsertProduct,
  UpdateProduct,
} from '../../../state/products/products.actions';
import { selectProductById } from '../../../state/products/products.selectors';
import { DnSelectboxComponent } from '../../components/dn-selectbox/dn-selectbox.component';
import { DnTextboxComponent } from '../../components/dn-textbox/dn-textbox.component';
import { DnNumberBoxComponent } from '../../components/dn-number-box/dn-number-box.component';
import { BaseComponent } from '../../components/base/base.component';
import { GetAllVatClasses } from '../../../state/parameters/vat-classes/vat-classes.actions';
import { selectAllVatClasses } from '../../../state/parameters/vat-classes/vat-classes.selectors';
import { GetAllBrands } from '../../../state/parameters/brands/brands.actions';
import { selectAllBrands } from '../../../state/parameters/brands/brands.selectors';
import { selectAllProductSizes } from '../../../state/parameters/product-sizes/product-sizes.selectors';
import { GetAllProductSizes } from '../../../state/parameters/product-sizes/product-sizes.actions';

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
export class ProductEditComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('matTable') table: MatTable<ProductBarcodeDto>;
  @ViewChild('optionSelected') optionSelected: MatOption;
  sizeControl = new FormControl('');
  brandControl = new FormControl('');
  product: any;
  product_text: string;
  productId: any;
  barcodesDataSource: MatTableDataSource<ProductBarcodeDto>;
  productBarcodesViewModel: ProductBarcodesViewModel;
  filteredSizes: Observable<ProductSizeDto[]>;
  displayedColumns = ['Barcode', 'SizeId', 'buttons'];
  productSizes$: Observable<ProductSizeDto[]>;
  newBarcodeLine: any;
  selected: any;
  isEditable: boolean;
  isAlertVisible: boolean;
  isDialog: boolean;
  noImgPath: string;
  sizeName: any;
  brands$: any;
  vatClassName: any;
  vatClasses$: any;
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.productId = history.state?.id;

    this.productBarcodesViewModel = new ProductBarcodesViewModel(
      this.http,
      this.auth
    );

    //If opens from
    if (data) {
      this.productId = data.product.ProductId;
      this.isDialog = true;
    } else {
      this.isDialog = false;
    }

    this.noImgPath = './assets/images/no-img.jpg';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getLookups();
    this.getData();
  }

  getLookups() {
    this.store.dispatch(GetAllBrands.action());
    this.store.dispatch(GetAllVatClasses());

    this.brands$ = this.store.select(selectAllBrands);
    this.vatClasses$ = this.store.select(selectAllVatClasses);
  }

  getData() {
    if (this.productId) {
      this.store.dispatch(GetProductById.action({ id: this.productId }));
      this.store
        .select(selectProductById(this.productId))
        .subscribe((product) => {
          this.product = { ...product } as ProductDto;
          this.product_text = this.product.Sku + ' - ' + this.product.Name;
          this.tabsService.setTabName(
            this.product.Sku + ' - ' + this.product.Name
          );

          this.getProductBarcodesData();

          this.store.dispatch(GetAllProductSizes.action());
          this.productSizes$ = this.store.select(selectAllProductSizes);
        });
    } else {
      this.product_text = 'New Product';
      this.product = new ProductDto();
      this.tabsService.setTabName(this.product_text);
    }

    this.filteredSizes = this.sizeControl.valueChanges.pipe(
      startWith(''),
      switchMap((value: string | null) => this.sizefilter(value || ''))
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

  private sizefilter(value: string): Observable<ProductSizeDto[]> {
    const filterValue = value.toLowerCase();

    return this.productSizes$.pipe(
      map((sizes: ProductSizeDto[]) =>
        sizes.filter((size) => size.Name.toLowerCase().includes(filterValue))
      )
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
        this.store.dispatch(DeleteProduct.action({ id: this.product.Id }));
      }
    });
  }

  onSaveClicked(e: any) {
    if (this.product.Id != null) {
      this.store.dispatch(UpdateProduct.action({ dto: this.product }));
    } else {
      this.store.dispatch(InsertProduct.action({ dto: this.product }));
    }
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
          this.displayErrorAlert(err);
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
          this.displayErrorAlert(err);
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
      switchMap((value: string | null) => this.sizefilter(value || ''))
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
  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertProduct.actionSuccess,
        insertFailure: InsertProduct.actionFailure,
        updateSuccess: UpdateProduct.actionSuccess,
        updateFailure: UpdateProduct.actionFailure,
        deleteSuccess: DeleteProduct.actionSuccess,
        deleteFailure: DeleteProduct.actionFailure,
      },
      {
        insertSuccess: (result) => {
          this.product = result.dto;
          this.productId = this.product.Id;
          this.product_text = this.product.Sku + ' - ' + this.product.Name;
          this.tabsService.setActiveTabName(this.product_text);
          this.displayNotification('Record inserted');
          this.getData();
        },
        insertFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateSuccess: (result) => {
          this.product = result.dto;
          this.product_text = this.product.Sku + ' - ' + this.product.Name;
          this.tabsService.setActiveTabName(this.product_text);
          this.displayNotification('Record updated');
          this.getData();
        },
        updateFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        deleteSuccess: () => {
          this.displayNotification('Record deleted');
          this.router.navigate(['products-list']);
        },
        deleteFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
      },
      this.destroy$
    );
  }
  //#endregion

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { VatClassesViewModel } from './../../view-models/vat-classes.viewmodel';
import { DocumentAdditionalChargesViewModel } from './../../view-models/document-additional-charges.viewmodel';
import { WebAppBase } from './../../base/web-app-base';
import { DocumentsViewModel } from './../../view-models/documents.viewmodel';
import { ProductBarcodesViewModel } from './../../view-models/product-barcodes.viewmodel';
import { ProductsViewModel } from './../../view-models/products.viewmodel';
import { AsyncPipe, CommonModule, DatePipe, Location } from '@angular/common';
import { CustomersViewModel } from './../../view-models/customers.viewmodel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomerDto } from '../../dto/customer.dto';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DocumentDto } from '../../dto/document.dto';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCell, MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DocumentProductDto } from '../../dto/document-product.dto';
import { DocumentProductsViewModel } from '../../view-models/document-products.viewmodel';
import { DocumentTypesViewModel } from '../../view-models/document-types.viewmodel';
import { DocumentTypeDto } from '../../dto/document-type.dto';
import { ProductDto } from '../../dto/product.dto';
import { ProductSizesViewModel } from '../../view-models/product-sizes.viewmodel';
import { ProductBarcodeDto } from '../../dto/product-barcode.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { MatTabsModule } from '@angular/material/tabs';
import { StatusesViewModel } from '../../view-models/statuses.viewmodel';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductOptionsComponent } from '../inventory/product-options/product-options.component';
import { AppTabDto } from '../../dto/app-tab.dto';
import { TabsService } from '../../services/tabs.service';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { AuthService } from '../../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentAdditionalChargesComponent } from '../document-additional-charges/document-additional-charges.component';
import { DocumentAdditionalChargeDto } from '../../dto/document-additional-charge.dto';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';
import { Navigation } from '../../base/navigation';
import { VatClassDto } from '../../dto/vat-class.dto';
import { SupplierDto } from '../../dto/supplier.dto';
import { SuppliersViewModel } from '../../view-models/suppliers.viewmodel';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { DnSelectboxComponent } from '../components/dn-selectbox/dn-selectbox.component';
import { DnTextboxComponent } from '../components/dn-textbox/dn-textbox.component';
import { DnNumberBoxComponent } from '../components/dn-number-box/dn-number-box.component';
import { DnDateBoxComponent } from '../components/dn-date-box/dn-date-box.component';

@Component({
  selector: 'app-document-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatCell,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    AsyncPipe,
    MatTabsModule,
    DnToolbarComponent,
    MatDialogModule,
    MatTooltipModule,
    DnGridComponent,
    DnSelectboxComponent,
    DnTextboxComponent,
    DnNumberBoxComponent,
    DnDateBoxComponent
  ],

  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },TabsService, HttpClientModule],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit, OnDestroy {
  @ViewChildren('td') cells: QueryList<ElementRef>;
  @ViewChild('productstable') productstable: DnGridComponent;

  documentsViewModel: DocumentsViewModel;
  documentId: any;
  statusesList: any;
  statusesViewModel: StatusesViewModel;
  currency: string;
  total: number = 0;
  addCharges: number = 0;
  activeTab: AppTabDto | undefined;

  previousTabName: string;
  documentAdditionalChargesViewModel: DocumentAdditionalChargesViewModel;
  document_must_be_saved_in_order_to_add_charges_text: string;
  documentGroup: any;
  documentType: any;

  vatClassesViewModel: VatClassesViewModel;
  suppliersViewModel: SuppliersViewModel;
  suppliers: any;
  columns: DnColumnDto[] = [];
  productSizesDataSource: any[];
  skuSelected: boolean;

  customersViewModel: CustomersViewModel;
  customers: any;
  document_text: string;
  customerPhone: number;
  vatNumber: number;
  documentProduct: DocumentProductDto = new DocumentProductDto();
  docTypes: Array<DocumentTypeDto>;
  productsDataSource: Array<DocumentProductDto> =
    new Array<DocumentProductDto>();
  document: DocumentDto = new DocumentDto();
  productDisplayedColumns: string[] = [
    'SerialNumber',
    'Barcode',
    'Sku',
    'ProductName',
    'SizeName',
    'Price',
    'VatAmount',
    'Quantity',
    'TotalVatAmount',
    'RowTotal',
    'buttons',
  ];
  documentProductsViewModel: DocumentProductsViewModel;
  documentTypesViewModel: DocumentTypesViewModel;
  productsViewModel: ProductsViewModel;
  lineProduct = new ProductDto();
  products: ProductDto[];

  productsSizes = new Array<ProductBarcodeDto>();
  productSizesViewModel: ProductSizesViewModel;
  productBarcodesViewModel: ProductBarcodesViewModel;
  barcodesLookupDatasource: any;
  datepipe: DatePipe = new DatePipe('en-US');
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private ref: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private tabsService: TabsService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.documentTypesViewModel = new DocumentTypesViewModel(
      this.http,
      this.auth
    );
    this.productSizesViewModel = new ProductSizesViewModel(
      this.http,
      this.auth
    );
    this.productBarcodesViewModel = new ProductBarcodesViewModel(
      this.http,
      this.auth
    );
    this.customersViewModel = new CustomersViewModel(this.http, this.auth);
    this.suppliersViewModel = new SuppliersViewModel(this.http, this.auth);
    this.documentProductsViewModel = new DocumentProductsViewModel(
      this.http,
      this.auth
    );
    this.vatClassesViewModel = new VatClassesViewModel(this.http, this.auth);
    this.productsViewModel = new ProductsViewModel(this.http, this.auth);
    this.documentsViewModel = new DocumentsViewModel(this.http, this.auth);
    this.statusesViewModel = new StatusesViewModel(this.http, this.auth);
    this.documentAdditionalChargesViewModel =
      new DocumentAdditionalChargesViewModel(this.http, this.auth);
    this.documentId = WebAppBase.data;
    WebAppBase.data = undefined;
    this.currency = WebAppBase.currency;
    let activeTab = TabsService.tabs.find((x) => x.Active == true);
    activeTab!.Data.forEach((row: any) => {
      if (row['Group']) {
        this.documentGroup = row['Group'];
      }

      if (row['Type']) {
        this.documentType = row['Type'];
      }
    });
  }

  ngOnInit() {
    this.getLookups();

    this.document_must_be_saved_in_order_to_add_charges_text =
      'Document must be saved first in order to add extra charges';

    this.customersViewModel.GetAll().subscribe((result: any) => {
      this.customers = result;
    });

    this.suppliersViewModel.GetAll().subscribe((result: any) => {
      this.suppliers = result;
    });


  }

  getLookups() {
    this.documentTypesViewModel
      .GetActiveDocumentTypesLookupByDocumentTypeGroup(this.documentGroup)
      .subscribe((result: any) => {
        this.docTypes = result;
        this.productBarcodesViewModel.GetLookup().subscribe((result: any) => {
          this.barcodesLookupDatasource = result;

          this.statusesViewModel.GetAll().subscribe((result: any) => {
            this.statusesList = result;

            this.productSizesViewModel.GetAll().subscribe((result: any) => {
              this.productSizesDataSource = result;
              this.productsViewModel.GetAll().subscribe((result: any) => {
                this.products = result;
                this.getColumns();
                this.getData();
              });
            });
          });
        });
      });
  }

  getData() {
    if (this.documentId) {
      this.getDocumentData(this.documentId);
      this.getAdditionalCharges(this.documentId);
    } else {
      this.initNewDocument();
    }
  }

  initNewDocument() {
    this.document = new DocumentDto();
    this.document_text = 'New Document';
    this.tabsService.setTabName(this.document_text);
    this.document.DocumentDateTime = new Date();
    for (let i = 0; i < 5; i++) {
      let product = new DocumentProductDto();
      product.IsEditable = true;
      product.IsRowFilled = false;
      this.productsDataSource.push(product);
    }
  }

  getDocumentData(documentId: Guid) {
    this.documentsViewModel.GetById(documentId).subscribe((result: any) => {
      this.document = result;

      this.ref.detectChanges();
      this.document_text = this.document.DocumentCode;
      this.tabsService.setTabName(this.document_text);
      // this.ref.detectChanges();
      this.getDocumentProducts(documentId);
    });
  }

  getDocumentProducts(documentId: Guid) {
    this.documentProductsViewModel
      .GetByDocumentId(documentId)
      .subscribe((result: any) => {
        this.productsDataSource = result;
        this.productsDataSource.forEach((product) => {
          product.SerialNumber = this.productsDataSource.indexOf(product) + 1;
        });
        this.calculateDocumentTotal();
      });
  }

  onKeydown(e: any, index: number) {
    if (this.productsDataSource[index].IsRowFilled && e.keyCode == 40) {
      let cellsArray = this.cells.toArray();
      cellsArray[index + 1].nativeElement.focus();
    }
  }

  getAdditionalCharges(documentId: Guid) {
    this.addCharges = 0;
    this.documentAdditionalChargesViewModel
      .GetByDocumentId(documentId)
      .subscribe((result: any) => {
        result.map((charge: DocumentAdditionalChargeDto) => {
          this.addCharges += charge.AdditionalChargeAmount;
        });
      });
  }

  onProductSkuSelection(sku: any, index: any) {
    this.productsViewModel.GetBySku(sku).subscribe((result: ProductDto) => {
      if (index == 0 || this.productsDataSource[index - 1]?.SerialNumber! > 0) {
        this.productsDataSource[index].ProductId = result.Id;
        this.productsDataSource[index].ProductName = result.Name;
        this.productsDataSource[index].ProductRetailPrice = result.RetailPrice;
        this.productsDataSource[index].Sku = result.Sku;
        this.productsDataSource[index].TotalPrice = result.RetailPrice;
        this.productsDataSource[index].Quantity = 1;
        this.productsDataSource[index].Barcode = undefined;
        this.productsDataSource[index].SizeName = '';
        this.productsDataSource[index].IsRowFilled = false;

        this.GetProductVatAmount(result.VatClassId, index);

        this.productBarcodesViewModel
          .GetByProductId(result.Id)
          .subscribe((result: any) => {
            this.productsSizes = result as ProductBarcodeDto[];

            if (this.productsSizes.length > 0) {
              // this.getFilteredSizes(index);
            } else {
              this.productsDataSource[index].SerialNumber = index + 1;
              this.productsDataSource[index].IsRowFilled = true;

              let cellsArray = this.cells.toArray();
              cellsArray[index + 1].nativeElement.focus();
              this.GetTotalVatAmount(index);

              this.calculateDocumentTotal();
            }
          });
      } else {
        this.productsDataSource[index].Sku = '';
      }
      this.ref.detectChanges();
    });
  }

  GetProductVatAmount(id: Guid, data: DocumentProductDto) {
    debugger
    if (!data.VatClassRate) {
      this.vatClassesViewModel.GetById(id).subscribe((result: any) => {
        let vatClass = result as VatClassDto;
        data.VatAmount =
          Math.round(
            ((data.ProductRetailPrice as number) -
              (data.ProductRetailPrice as number) / (vatClass.Rate / 100 + 1)) *
              100
          ) / 100;

        data.VatClassRate = result.Rate;
        data.VatClassId = result.Id;
        this.GetTotalVatAmount(data);
      });
    } else {
      data.VatAmount =
        Math.round(
          ((data.ProductRetailPrice as number) -
            (data.ProductRetailPrice as number) /
              (data.VatClassRate / 100 + 1)) *
            100
        ) / 100;

      this.GetTotalVatAmount(data);
    }
  }

  GetTotalVatAmount(data: DocumentProductDto) {
    data.TotalVatAmount = data.VatAmount! * data.Quantity!;
  }



  onSaveClicked(e: any) {
    //If the first row is filled in then it passes the validation
    //this.document.DocumentDateTime =this.datepipe.transform(this.document.DocumentDateTime, 'dd/MM/YYYY')
    if (!this.document.Id) {
      if (this.productsDataSource[0].IsRowFilled) {
        if (this.document.DocumentTypeId) {
          this.document.DocumentTotal = this.total;

          this.documentsViewModel
            .InsertDto(this.document)
            .subscribe((result: any) => {
              this.document = result;
              this.previousTabName = this.document_text.toString();
              this.document_text = this.document.DocumentCode;
              this.tabsService.setActiveTabNameWithoutChangingPreviousName(
                this.document_text
              );

              //Fill in documentId to display the right data (delete button, table)
              this.documentId = this.document.Id;
              //Render table again to remove empty lines
              this.productsDataSource = this.productsDataSource.filter(
                (x) => x.IsRowFilled == true
              );
              this.productstable.renderRows();
              let productsResults = new Array<DocumentProductDto>();

              this.productsDataSource.forEach((productRow) => {
                if (productRow.IsRowFilled) {
                  productRow.DocumentId = result.Id;

                  this.documentProductsViewModel
                    .InsertDto(productRow)
                    .subscribe((result: any) => {
                      productsResults.push(result);
                      if (
                        productsResults.length ==
                        this.productsDataSource.filter(
                          (x) => x.IsRowFilled == true
                        ).length
                      ) {
                        this.document_text = this.document.DocumentCode;
                        this.ref.detectChanges();

                        this.displayNotification('Record inserted');
                      }
                    });
                  this.getData();
                }
              });
            });
        }
      } else {
        alert('Select DocType');
      }
    }else {
      this.calculateDocumentTotal();
      this.documentsViewModel
        .UpdateDto(this.document)
        .subscribe((result: any) => {
          this.displayNotification('Record updated');
        });
    }
  }

  displayNotification(text: string) {
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
  }

  onCloseClicked(e: any) {
    let activeTab = this.tabsService.getActiveTab();
    activeTab!.Data.forEach((row: any) => {
      if (row['Group']) {
        this.documentGroup = row['Group'];
      }

      if (row['Type']) {
        this.documentType = row['Type'];
      }
    });
    this.router.navigate(['documents-list'], {
      queryParams: { Group: this.documentGroup, Type: this.documentType },
    });

    this.tabsService.setActiveTabPreviousName();
  }

  onProductInfoClicked(e: any, index: number) {
    const dialogRef = this.dialog.open(ProductOptionsComponent, {
      width: '750px',
      height: '280px',
      data: {
        product: this.productsDataSource[index],
      },
      viewContainerRef: this.viewContainerRef,
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
      }
    });
  }

  calculateDocumentTotal() {
    this.total = 0;
    for (let i = 0; i < this.productsDataSource.length; i++) {
      if (this.productsDataSource[i]?.TotalPrice) {
        this.total += this.productsDataSource[i].TotalPrice!;
      }
    }
    this.total += this.addCharges;
    this.document.DocumentTotal = this.total;
  }

  onProductRowDelete(data: any) {
    if (this.document.Id) {
    } else {
      this.removeProduct(data);
    }
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
        if (this.productsDataSource.length > 0) {
          let productsDeleted = 0;
          this.productsDataSource.forEach((productRow) => {
            //TODO change with soft delete
            this.documentProductsViewModel
              .DeleteById(productRow.Id)
              .subscribe((result: any) => {
                productsDeleted += 1;
                if (productsDeleted == this.productsDataSource.length) {
                  this.deleteDocument();
                }
              });
          });
        } else {
          this.deleteDocument();
        }
      }
    });
  }

  deleteDocument() {
    this.documentsViewModel
      .DeleteById(this.documentId)
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.router.navigate(['documents-list'], {
          queryParams: { Group: this.documentGroup, Type: this.documentType },
        });
        this.tabsService.setActiveTabPreviousName();
      });
  }

  onBarcodeInput(
    data: DocumentProductDto,
    productsDataSource: DocumentProductDto[]
  ) {
    //If product exists in the table
    let exists = this.checkIfProductExistsInTheTable(
      productsDataSource,
      data.Barcode!
    );
    if (exists) {
      this.addQuantityToExistingLine(data, productsDataSource);
    } else {
      //If product doesn't exist in the table
      if (this.barcodesLookupDatasource.includes(data.Barcode)) {
        this.productBarcodesViewModel
          .GetByBarcode(data.Barcode!)
          .subscribe((result: ProductBarcodeDto) => {
            Object.assign(data, result);

            this.GetProductVatAmount(result.VatClassId!, data);

            data.TotalPrice = result.ProductRetailPrice;
            data.Quantity = 1;
            data.ProductNameCopy = result.ProductName;
            data.IsEditable = true;
            data.BarcodeCopy = data.Barcode;
            data.IsRowFilled = true;
            data.ProductSizeId = result.SizeId;
            data.SizeName = result.SizeName;
            let row = productsDataSource.find(
              (x: DocumentProductDto) => x.Barcode == data.Barcode
            );
            if (row) {
              data.SerialNumber = productsDataSource.indexOf(row) + 1;
            }
            // let cellsArray = this.cells.toArray();
            // cellsArray[index + 1].nativeElement.focus();
            this.calculateDocumentTotal();
            this.getProductSizes(data.ProductId, this.columns);
          });
      } else if (data.SerialNumber! >= 0 && data.BarcodeCopy != data.Barcode) {
        data.Barcode = data.BarcodeCopy;
      }
    }
  }

  checkIfProductExistsInTheTable(
    productsDataSource: DocumentProductDto[],
    barcode: string
  ) {
    let exists = productsDataSource.some(
      (x: any) => x.Barcode == barcode && x.IsRowFilled == true
    );
    return exists;
  }

  addQuantityToExistingLine(
    data: DocumentProductDto,
    productsDataSource: DocumentProductDto[]
  ) {
    let line = productsDataSource.find((x) => x.Barcode == data.Barcode);
    //Set cell value to empty string so the user can input another barcode
    if (line) {
      let indexOfBarcode = productsDataSource.indexOf(line!);
      productsDataSource[indexOfBarcode].Quantity! += 1;
      productsDataSource[indexOfBarcode].TotalPrice =
        productsDataSource[indexOfBarcode].Quantity! *
        productsDataSource[indexOfBarcode].ProductRetailPrice!;

      let activeIndex = productsDataSource.indexOf(data);
      productsDataSource[activeIndex] = new DocumentProductDto();
      productsDataSource[activeIndex].IsEditable = true; //Keeps the line editable
      this.GetProductVatAmount(
        productsDataSource[indexOfBarcode].VatClassId,
        productsDataSource[indexOfBarcode]
      );

      //Total Vat Amount doesn't affect the row total.
      //this.GetTotalVatAmount(productIndex);
      this.calculateDocumentTotal();
    }
  }

  removeProduct(data: any) {
    this.productsDataSource.splice(data.rowIndex, 1);
    for (let i = data.rowIndex; i < this.productsDataSource.length - 1; i++) {
      // this.sizeControlArray[i] = this.sizeControlArray[i + 1];
      this.productstable.renderRows();
    }

    for (let i = this.productsDataSource.length; i < 5; i++) {
      let product = new DocumentProductDto();
      product.IsRowFilled = false;
      product.IsEditable = true;

      // product.SizeName = '';
      // product.Sku = '';
      this.productsDataSource.push(product);
      this.productstable.renderRows();
    }

    // When a product is removed we have to set again the serial numbers for each row and
    // add the new value only to those rows that have IsRowFilled = true

    this.productsDataSource.forEach((product) => {
      if (product.IsRowFilled)
        product.SerialNumber = this.productsDataSource.indexOf(product) + 1;
    });
    this.calculateDocumentTotal();
  }

  displaySizes(value: string) {
    return value ? value : '';
  }

  onSizeSelectionChanged(
    data: DocumentProductDto,
    productsDataSource: DocumentProductDto[]
  ) {
    if (data.ProductId) {
      this.productBarcodesViewModel
        .GetByProductId(data.ProductId)
        .subscribe((result: ProductBarcodeDto[]) => {
          let barcodeData = result.find(
            (x: ProductBarcodeDto) => x.SizeId == data.ProductSizeId
          );

          let exists = this.checkIfProductExistsInTheTable(
            productsDataSource,
            barcodeData != null ? barcodeData.Barcode : ''
          );
          //data.Barcode = barcodeData!.Barcode;

          if (exists) {
            // this.addQuantityToExistingLine(index);
          } else {
            let rowIndex = productsDataSource.indexOf(data);
debugger
            if (barcodeData) {
              data.IsRowFilled = true;
              data.Barcode = barcodeData.Barcode;
              data.SerialNumber = rowIndex + 1;
              data.SizeName = data.SizeName;
              data.ProductSizeId = barcodeData.SizeId;
            }
            // let cellsArray = this.cells.toArray();
            // cellsArray[index + 1].nativeElement.focus();
          }
        });
    }
    this.calculateDocumentTotal();
  }

  onQuantityChange(data: DocumentProductDto) {
    if (data.ProductRetailPrice) {
      data.TotalPrice = data.ProductRetailPrice! * data.Quantity!;
      this.GetProductVatAmount(data.VatClassId, data);

      this.calculateDocumentTotal();
    } else {
      data.Quantity = undefined;
    }
  }

  onRowTotalChange(e: any, index: number) {
    if (this.productsDataSource[index].Sku) {
      this.productsDataSource[index].TotalPrice = e.target.value as number;
    } else {
      this.productsDataSource[index].TotalPrice = undefined;
    }
    this.calculateDocumentTotal();
  }

  onPriceChange(data: DocumentProductDto) {
    if (data.Quantity) {
      data.TotalPrice = data.Quantity! * data.ProductRetailPrice!;
      debugger
      this.GetProductVatAmount(data.VatClassId, data);
    } else {
      data.ProductRetailPrice = undefined;
    }
    this.calculateDocumentTotal();
    //this.GetTotalVatAmount(index);
  }

  onProductNameChanged(e: any, index: number) {
    if (this.productsDataSource[index].Sku) {
      this.productsDataSource[index].ProductName = e.target.value;
    } else {
      this.productsDataSource[index].ProductName = undefined;
    }
  }

  onCellFocus(e: any, index: number, column: string) {
    if (index - 1 >= 0) {
      if (this.productsDataSource[index - 1]) {
        if (this.productsDataSource[index - 1].SerialNumber! >= 1) {
          let cellsArray = this.cells.toArray();
          cellsArray[index].nativeElement.focus();
          if (this.productsDataSource.length - 1 == index) {
            let newProductLine = new DocumentProductDto();
            newProductLine.Sku = '';
            newProductLine.SizeName = '';
            this.productsDataSource.push(newProductLine);
            this.productstable.renderRows();
          }
        } else if (index > 0) {
          let cellsArray = this.cells.toArray();
          cellsArray[index - 1].nativeElement.focus();
        }
      }
    }
  }

  onDocumentAdditionalChargesClicked(e: any) {
    //Document must be saved in order to add charges
    if (this.documentId) {
      const dialogRef = this.dialog.open(DocumentAdditionalChargesComponent, {
        width: '750px',
        height: '550px',
        data: {
          DocumentId: this.documentId,
        },
        viewContainerRef: this.viewContainerRef,
      });
      dialogRef.afterClosed().subscribe((confirm) => {
        this.getDocumentData(this.documentId);
        this.getAdditionalCharges(this.documentId);
      });
    } else {
      const dialog = this.dialog.open(DnAlertComponent, {
        data: {
          Title: 'Message',
          Message: this.document_must_be_saved_in_order_to_add_charges_text,
        },
      });
    }
  }

  onRefreshClicked(e: any) {
    this.getData();
    this.productstable.renderRows();
  }

  ngOnDestroy() {
    WebAppBase.data = undefined;
  }

  onSkuSelection(data: DocumentProductDto, columns: DnColumnDto[]) {
    this.productsViewModel
      .GetBySku(data.Sku!)
      .subscribe(async (result: ProductDto) => {
        data.ProductId = result.Id;
        data.ProductName = result.Name;
        data.ProductRetailPrice = result.RetailPrice;
        data.TotalPrice = result.RetailPrice;
        data.Quantity = 1;
        data.Barcode = undefined;
        data.IsRowFilled = false;
        this.GetProductVatAmount(result.VatClassId, data);
        this.getProductSizes(data.ProductId, columns);
      });
  }

  getProductSizes(productId: Guid, columns: DnColumnDto[]) {
    this.productBarcodesViewModel
      .GetByProductId(productId)
      .subscribe(async (result: any) => {
        await result;
        this.productSizesDataSource = result;
        this.skuSelected = true;
        columns = this.getColumns();
        this.ref.detectChanges();
      });
  }

  getColumns() {
    this.columns = [
      {
        DataField: 'SerialNumber',
        DataType: 'number',
        Caption: 'Serial Number',
        ReadOnly: true,
      },
      {
        DataField: 'Barcode',
        DataType: 'string',
        Caption: 'Barcode',
        OnValueChange: (data: any, dataSource: any) => {
          this.onBarcodeInput(data, dataSource);
        },
      },
      {
        DataField: 'Sku',
        DataType: 'string',
        Caption: 'Sku',
        Lookup: {
          DataSource: this.products,
          ValueExpr: 'Sku',
          DisplayExpr: 'Sku',
        },
        OnSelectionChange: (data: any, columns: DnColumnDto[]) => {
          this.onSkuSelection(data, columns);
        },
      },
      {
        DataField: 'ProductName',
        DataType: 'string',
        Caption: 'Product Name',
      },
      {
        DataField: 'ProductSizeId',
        DataType: 'string',
        Caption: 'Size',
        Lookup: {
          DataSource: this.productSizesDataSource,
          ValueExpr: this.skuSelected ? 'SizeId' : 'Id',
          DisplayExpr: this.skuSelected ? 'SizeName' : 'Name',
        },
        OnClick: () => {},
        OnSelectionChange: (
          data: DocumentProductDto,
          dataSource: DocumentProductDto[]
        ) => {
          this.onSizeSelectionChanged(data, dataSource);
        },
      },
      {
        DataField: 'ProductRetailPrice',
        DataType: 'number',
        Caption: 'Price',
        Min: 0.0,
        OnValueChange: (data: any, dataSource: any) => {
          this.onPriceChange(data);
        },
      },
      {
        DataField: 'VatAmount',
        DataType: 'number',
        Caption: 'Vat Amount',
        ReadOnly: true,
      },
      {
        DataField: 'Quantity',
        DataType: 'number',
        Caption: 'Quantity',
        Min: 1,
        OnValueChange: (data: any, dataSource: any) => {
          this.onQuantityChange(data);
        },
      },
      {
        DataField: 'TotalVatAmount',
        DataType: 'number',
        Caption: 'Total Vat',
        ReadOnly: true,
      },
      {
        DataField: 'TotalPrice',

        DataType: 'number',
        Caption: 'Total Price',
        Min: 0.0,
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

    return this.columns;
  }

  onProductRowSaving(data: any) {
    this.documentProductsViewModel.UpdateDto(data).subscribe((result: any) => {
      this.displayNotification('Record updated');
    });
  }

  onProductRowStopEditing(e: any) {
    this.getDocumentProducts(this.document.Id);
  }
}

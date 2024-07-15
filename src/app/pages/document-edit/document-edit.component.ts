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
import { provideNativeDateAdapter } from '@angular/material/core';
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
  ],
  providers: [provideNativeDateAdapter(), TabsService, HttpClientModule],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit, OnDestroy {
  @ViewChildren('td') cells: QueryList<ElementRef>;
  @ViewChild('productstable') productstable: MatTable<ProductBarcodeDto>;
  selectedDocType: DocumentTypeDto = new DocumentTypeDto();
  documentsViewModel: DocumentsViewModel;
  documentId: any;
  selectedStatus: DocumentTypeDto;
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
  doctypeName: string;
  statusName: any;
  vatClassesViewModel: VatClassesViewModel;
  supplier: string = '';
  suppliersViewModel: SuppliersViewModel;
  suppliers: any;
  onKeydown(e: any, index: number) {
    if (this.productsDataSource[index].IsRowFilled && e.keyCode == 40) {
      let cellsArray = this.cells.toArray();
      cellsArray[index + 1].nativeElement.focus();
    }
  }
  customersViewModel: CustomersViewModel;
  customers: any;
  customerNames: string[] = new Array();
  nameControl = new FormControl();
  skuControl = new FormControl('');
  customer: CustomerDto = new CustomerDto();
  document_text: string;
  filteredNames: Observable<string[]>;
  filteredProducts: Observable<ProductDto[]>;
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
  sizeControlArray = new Array<FormControl>();
  filteredSizes: Observable<ProductBarcodeDto[]>;
  filteredSizesArray: Observable<ProductBarcodeDto[]>[];
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
    this.currency = WebAppBase.currency;
    WebAppBase.data = undefined;
    let activeTab = TabsService.tabs.find((x) => x.Active == true);
    activeTab!.Data.forEach((row: any) => {
      if (row['Group']) {
        this.documentGroup = row['Group'];
      }

      if (row['Type']) {
        this.documentType = row['Type'];
      }
    });
    this.getLookups();
  }

  ngOnInit() {
    this.getData();

    this.document_must_be_saved_in_order_to_add_charges_text =
      'Document must be saved first in order to add extra charges';

    this.productsViewModel.GetAll().subscribe((result: any) => {
      this.products = result;
      this.filteredProducts = this.skuControl.valueChanges.pipe(
        startWith(''),
        map((value: string | null) => this._skufilter(value || ''))
      );
    });

    this.filteredNames = this.nameControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._namefilter(value || ''))
    );

    this.customersViewModel.GetAll().subscribe((result: any) => {
      this.customers = result;
      this.customers.map((customer: any) => {
        this.customerNames.push(customer.Name);
      });
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
      });
    this.productBarcodesViewModel.GetLookup().subscribe((result: any) => {
      this.barcodesLookupDatasource = result;
    });
    this.statusesViewModel.GetAll().subscribe((result: any) => {
      this.statusesList = result;
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
    this.document_text = 'New Document';
    this.tabsService.setTabName(this.document_text);
    this.document.DocumentDateTime = new Date();
    for (let i = 0; i < 5; i++) {
      let product = new DocumentProductDto();
      this.productsDataSource.push(product);
      this.sizeControlArray.push(new FormControl(''));
      this.filteredSizes = this.sizeControlArray[i].valueChanges.pipe(
        startWith(''),
        map((value: string | null) => this.sizefilter(value || ''))
      );
      this.filteredSizesArray = new Array<Observable<ProductBarcodeDto[]>>();
      this.filteredSizesArray.push(this.filteredSizes);

      this.getFilteredSizes(i);
    }
  }

  getDocumentData(documentId: Guid) {
    this.documentsViewModel.GetById(documentId).subscribe((result: any) => {
      this.document = result;

      this.nameControl.setValue(result.CustomerName);
      this.document_text = this.document.DocumentCode;
      this.tabsService.setTabName(this.document_text);
      // this.ref.detectChanges();
      let selectedDocType = this.docTypes.find(
        (x) => x.Id == this.document.DocumentTypeId
      );
      if (selectedDocType) {
        this.doctypeName = selectedDocType.Abbreviation;
      }

      let selectedStatus = this.statusesList.find(
        (x: any) => x.Id == this.document.DocumentStatusId
      );
      if (selectedStatus) {
        this.statusName = selectedStatus.Name;
      }
      this.documentProductsViewModel
        .GetByDocumentId(documentId)
        .subscribe((result: any) => {
          this.productsDataSource = result;
          this.calculateDocumentTotal();
        });
    });
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
  getFilteredSizes(index: number) {
    this.filteredSizesArray[index] = this.sizeControlArray[
      index
    ].valueChanges.pipe(
      startWith(''),
      map((value: string | null) => this.sizefilter(value || ''))
    );
  }

  private sizefilter(value: string): ProductBarcodeDto[] {
    const filterValue = value.toLowerCase();
    return this.productsSizes.filter((size: ProductBarcodeDto) =>
      size.SizeName!.toLowerCase().includes(filterValue)
    );
  }

  private _namefilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.customerNames.filter((name) =>
      name.toLowerCase().includes(filterValue)
    );
  }

  private _skufilter(value: string): ProductDto[] {
    const filterValue = value.toLowerCase();
    return this.products.filter((product: ProductDto) =>
      product.Sku?.toLowerCase().includes(filterValue)
    );
  }

  onNameSelection(name: string) {
    this.customer = this.customers.find(
      (customer: CustomerDto) => customer.Name == name
    );
    this.document.CustomerPhone1 = this.customer.Phone1!;
  }

  onSupplierSelection(name: string) {
    this.supplier = this.suppliers.find(
      (supplier: SupplierDto) => supplier.Name == name
    );
    this.document.CustomerPhone1 = this.customer.Phone1!;
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
              this.getFilteredSizes(index);
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

  GetProductVatAmount(id: Guid, index: number) {
    if (!this.productsDataSource[index].VatClassRate) {
      this.vatClassesViewModel.GetById(id).subscribe((result: any) => {
        let vatClass = result as VatClassDto;
        this.productsDataSource[index].VatAmount =
          Math.round(
            ((this.productsDataSource[index].ProductRetailPrice as number) -
              (this.productsDataSource[index].ProductRetailPrice as number) /
                (vatClass.Rate / 100 + 1)) *
              100
          ) / 100;

        this.productsDataSource[index].VatClassRate = result.Rate;
        this.productsDataSource[index].VatClassId = result.Id;
        this.GetTotalVatAmount(index);
      });
    } else {
      this.productsDataSource[index].VatAmount =
        Math.round(
          ((this.productsDataSource[index].ProductRetailPrice as number) -
            (this.productsDataSource[index].ProductRetailPrice as number) /
              (this.productsDataSource[index].VatClassRate / 100 + 1)) *
            100
        ) / 100;
    }
  }

  GetTotalVatAmount(index: number) {
    this.productsDataSource[index].TotalVatAmount =
      (this.productsDataSource[index].VatAmount as number) *
      (this.productsDataSource[index].Quantity as number);
  }

  onDocTypeSelection(e: any) {
    let selectedDocType = this.docTypes.find(
      (docType: DocumentTypeDto) => docType.Abbreviation == e.value
    );

    if (selectedDocType) {
      this.selectedDocType = selectedDocType;
      this.document.DocumentTypeId = selectedDocType.Id;
    }
  }

  onDocStatusSelection(e: any) {
    let selectedStatus = this.statusesList.find(
      (status: DocumentTypeDto) => status.Name == e.value
    );

    if (selectedStatus) {
      this.selectedStatus = selectedStatus;
      this.document.DocumentStatusId = selectedStatus.Id;
    }
  }

  onSaveClicked(e: any) {
    //If the first row is filled in then it passes the validation
    //this.document.DocumentDateTime =this.datepipe.transform(this.document.DocumentDateTime, 'dd/MM/YYYY')
    if (this.productsDataSource[0].IsRowFilled) {
      if (this.selectedDocType!.Id) {
        this.document.DocumentTypeId = this.selectedDocType.Id;
        this.document.DocumentStatusId = this.selectedStatus.Id;
        this.document.CustomerId = this.customer.Id;
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
              }
            });
          });
      } else {
        alert('Select DocType');
      }
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

  onBarcodeInput(e: any, index: number) {
    //If product exists in the table
    let exists = this.checkIfProductExistsInTheTable(
      index,
      this.productsDataSource[index].Barcode!
    );
    if (exists) {
      this.addQuantityToExistingLine(index);
    } else {
      //If product doesn't exist in the table
      if (this.barcodesLookupDatasource.includes(e.target.value)) {
        this.productBarcodesViewModel
          .GetByBarcode(e.target.value)
          .subscribe((result: ProductBarcodeDto) => {
            Object.assign(this.productsDataSource[index], result);

            this.GetProductVatAmount(result.VatClassId!, index);
            this.productsDataSource[index].SerialNumber = index + 1;
            this.productsDataSource[index].TotalPrice =
              result.ProductRetailPrice;
            this.productsDataSource[index].Quantity = 1;
            this.productsDataSource[index].ProductNameCopy = result.ProductName;
            this.productsDataSource[index].BarcodeCopy = e.target.value;
            this.productsDataSource[index].IsRowFilled = true;

            let cellsArray = this.cells.toArray();
            cellsArray[index + 1].nativeElement.focus();
            this.calculateDocumentTotal();
          });
      } else if (
        this.productsDataSource[index].SerialNumber! >= 0 &&
        this.productsDataSource[index].BarcodeCopy != e.target.value
      ) {
        this.productsDataSource[index].Barcode =
          this.productsDataSource[index].BarcodeCopy;
      }
    }
  }

  checkIfProductExistsInTheTable(index: number, barcode: string) {
    let exists = this.productsDataSource.some(
      (x) => x.Barcode == barcode && x.IsRowFilled == true
    );
    return exists;
  }

  addQuantityToExistingLine(index: number) {
    let line = this.productsDataSource.find(
      (x) => x.Barcode == this.productsDataSource[index].Barcode
    );

    //Set cell value to empty string so the user can input another barcode
    this.productsDataSource[index] = new DocumentProductDto();
    this.productsDataSource[index].SizeName = '';
    this.productsDataSource[index].Sku = '';
    let productIndex = this.productsDataSource.indexOf(line!);
    this.productsDataSource[productIndex].Quantity! += 1;
    this.productsDataSource[productIndex].TotalPrice =
      this.productsDataSource[productIndex].Quantity! *
      this.productsDataSource[productIndex].ProductRetailPrice!;

    //Total Vat Amount doesn't affect the row total.
    this.GetTotalVatAmount(productIndex);
    this.calculateDocumentTotal();
  }

  removeProduct(e: any, index: number) {
    this.productsDataSource.splice(index, 1);
    for (let i = index; i < this.productsDataSource.length - 1; i++) {
      this.sizeControlArray[i] = this.sizeControlArray[i + 1];
      this.productstable.renderRows();
    }

    for (let i = this.productsDataSource.length; i < 5; i++) {
      let product = new DocumentProductDto();
      product.SizeName = '';
      this.productsDataSource.push(product);
      this.productstable.renderRows();
    }
    this.calculateDocumentTotal();
  }

  displaySizes(value: string) {
    return value ? value : '';
  }

  onSizeSelectionChanged(data: any, index: number) {
    if (this.productsDataSource[index].ProductId) {
      this.productBarcodesViewModel
        .GetByProductId(this.productsDataSource[index].ProductId)
        .subscribe((result: ProductBarcodeDto[]) => {
          let barcodeData = result.find(
            (x: ProductBarcodeDto) => x.Id == data.Id
          );

          let exists = this.checkIfProductExistsInTheTable(
            index,
            barcodeData!=null?barcodeData.Barcode:""
          );

          if (exists) {
            this.addQuantityToExistingLine(index);
            this.sizeControlArray[index].setValue(null);
          }
            else {

              if (barcodeData) {
                this.productsDataSource[index].Barcode = barcodeData.Barcode;
                this.productsDataSource[index].IsRowFilled = true;
                this.productsDataSource[index].SerialNumber = index + 1;
                this.productsDataSource[index].SizeName = data.SizeName;
                this.productsDataSource[index].SizeId = barcodeData.SizeId;
              }
              let cellsArray = this.cells.toArray();
              cellsArray[index + 1].nativeElement.focus();
            }

        });
    }
    this.calculateDocumentTotal();
  }

  onQuantityChange(e: any, index: number) {
    if (this.productsDataSource[index].ProductRetailPrice) {
      this.productsDataSource[index].TotalPrice =
        this.productsDataSource[index].ProductRetailPrice! * e.target.value;
      this.calculateDocumentTotal();
    } else {
      this.productsDataSource[index].Quantity = undefined;
    }
    this.GetTotalVatAmount(index);
  }

  onRowTotalChange(e: any, index: number) {
    if (this.productsDataSource[index].Sku) {
      this.productsDataSource[index].TotalPrice = e.target.value as number;
    } else {
      this.productsDataSource[index].TotalPrice = undefined;
    }
    this.calculateDocumentTotal();
  }

  onPriceChange(e: any, index: number) {
    if (this.productsDataSource[index].Quantity) {
      this.productsDataSource[index].TotalPrice =
        this.productsDataSource[index].Quantity! * e.target.value;
      this.GetProductVatAmount(
        this.productsDataSource[index].VatClassId,
        index
      );
    } else {
      this.productsDataSource[index].ProductRetailPrice = undefined;
    }
    this.calculateDocumentTotal();
    this.GetTotalVatAmount(index);
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

  displaySupplier(data: any): string {
    if (data?.Name) {
      if (this.document) {
        this.document.SupplierId = data.Id;
      }
      return data.Name;
    } else {
      return '';
    }
  }

  onRefreshClicked(e: any) {
    this.getData();
    this.productstable.renderRows();
  }

  ngOnDestroy() {
    WebAppBase.data = undefined;
  }
}

import { DocumentsViewModel } from './../../view-models/documents.viewmodel';
import { BrandDto } from './../../dto/brand.dto';
import { ProductBarcodesViewModel } from './../../view-models/product-barcodes.viewmodel';
import { ProductsViewModel } from './../../view-models/products.viewmodel';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
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
import {
  MatCell,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DocumentProductDto } from '../../dto/document-product.dto';
import { DocumentProductsViewModel } from '../../view-models/document-products.viewmodel';
import { DocumentTypesViewModel } from '../../view-models/document-types.viewmodel';
import { DocumentTypeDto } from '../../dto/document-type.dto';
import { ProductDto } from '../../dto/product.dto';
import { ProductSizeDto } from '../../dto/product-size.dto';
import { ProductSizesViewModel } from '../../view-models/product-sizes.viewmodel';
import { ProductBarcodeDto } from '../../dto/product-barcode.dto';
import { WebAppBase } from '../../base/web-app-base';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import {MatTabsModule} from '@angular/material/tabs';
import { StatusesViewModel } from '../../view-models/statuses.viewmodel';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatTabsModule
  ],
  providers: [provideNativeDateAdapter()],
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

  onKeydown(e: any, index: number) {
    if (this.productsDataSource[index].IsRowFilled && e.keyCode == 40) {
      let cellsArray = this.cells.toArray();
      cellsArray[index + 1].nativeElement.focus();
    }
  }
  dataSourceChange = new EventEmitter();
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
    'ProductQuantity',
    'RowTotal',
    'delete',
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
    private ref: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.documentTypesViewModel = new DocumentTypesViewModel(this.http);
    this.productSizesViewModel = new ProductSizesViewModel(this.http);
    this.productBarcodesViewModel = new ProductBarcodesViewModel(this.http);
    this.customersViewModel = new CustomersViewModel(this.http);
    this.documentProductsViewModel = new DocumentProductsViewModel(this.http);
    this.productsViewModel = new ProductsViewModel(this.http);
    this.documentsViewModel = new DocumentsViewModel(this.http);
    this.statusesViewModel = new StatusesViewModel(this.http)
    this.documentId = WebAppBase.data;

    if (this.documentId) {
      this.getDocumentData(this.documentId);
    } else {
      this.initNewDocument();
    }
  }

  ngOnInit() {
    this.productBarcodesViewModel.GetLookup().subscribe((result: any) => {
      this.barcodesLookupDatasource = result;
    });
    this.documentTypesViewModel.GetAll().subscribe((result: any) => {
      this.docTypes = result;
    });
    this.statusesViewModel.GetAll().subscribe((result: any) => {
      this.statusesList = result;
    });

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
  }

  initNewDocument() {
    this.document_text = 'New Document';
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
      this.document_text =
        this.document.DocumentTypeName +
        '-' +
        this.document.DocumentNumber.toString().padStart(6, '0');
      this.ref.detectChanges();

      this.documentProductsViewModel
        .GetByDocumentId(documentId)
        .subscribe((result: any) => {
          this.productsDataSource = result;
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

  onProductSkuSelection(sku: any, index: any) {
    this.productsViewModel.GetBySku(sku).subscribe((result: any) => {
      if (index == 0 || this.productsDataSource[index - 1]?.SerialNumber! > 0) {
        this.productsDataSource[index].ProductId = result.Id;
        this.productsDataSource[index].ProductName = result.Name;
        this.productsDataSource[index].Price = result.Price;
        this.productsDataSource[index].RowTotal = result.Price;
        this.productsDataSource[index].ProductQuantity = 1;
        this.productsDataSource[index].Barcode = undefined;
        this.productsDataSource[index].SizeName = '';
        this.productsDataSource[index].IsRowFilled = false;

        this.productBarcodesViewModel
          .GetByProductId(result.Id)
          .subscribe((result: any) => {
            this.productsSizes = result as ProductBarcodeDto[];
            this.getFilteredSizes(index);
          });
      } else {
        this.productsDataSource[index].Sku = '';
      }
      this.ref.detectChanges();
    });
  }
  onDocTypeSelection(e: any) {
    let selectedDocType = this.docTypes.find(
      (docType: DocumentTypeDto) => docType.Name == e.value
    );

    if (selectedDocType) {
      this.selectedDocType = selectedDocType;
    }
  }

  onDocStatusSelection(e:any){
    let selectedStatus = this.statusesList.find(
      (status: DocumentTypeDto) => status.Name == e.value
    );

    if (selectedStatus) {
      this.selectedStatus = selectedStatus;
    }
  }

  onSaveClicked(e: any) {
    //If the first row is filled in then it passes the validation
    //this.document.DocumentDateTime =this.datepipe.transform(this.document.DocumentDateTime, 'dd/MM/YYYY')
    if (this.productsDataSource[0].IsRowFilled) {
      if (this.selectedDocType!.Id) {
        if (this.customer.Id) {
          this.document.DocumentTypeId = this.selectedDocType.Id;
          this.document.DocumentStatusId = this.selectedStatus.Id;
          this.document.CustomerId = this.customer.Id;
          debugger;
          this.documentsViewModel
            .InsertDto(this.document)
            .subscribe((result: any) => {
              this.document=result;
              //Fill in documentId to display the right data (delete button, table)
              this.documentId=this.document.Id;
              //Render table again to remove empty lines
              this.productsDataSource=this.productsDataSource.filter(x=>x.IsRowFilled==true)
              this.productstable.renderRows();
              let productsResults = new Array<DocumentProductDto>();
              let total= 0;
              this.productsDataSource.forEach((productRow) => {
                total+=productRow.RowTotal!;
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
                        this.document_text =
                          this.document.DocumentTypeName +
                          '-' +
                          this.document.DocumentNumber.toString().padStart(
                            6,
                            '0'
                          );
                        this.ref.detectChanges();
                        alert('Insert Successful');
                      }
                    });
                }
              });
              //Update document with total when all products have been inserted
              this.document.DocumentTotal= total
              this.documentsViewModel.UpdateDto(this.document).subscribe((result:any)=>{})
            });
        } else {
          alert('Select Customer');
        }
      } else {
        alert('Select DocType');
      }
    }
  }

  onCloseClicked(e: any) {
    this.router.navigate(['documents-list']);
  }

  onDeleteClicked(e: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        let productsResults = new Array<DocumentProductDto>();

        this.productsDataSource.forEach(productRow => {
          //TODO change with soft delete
          this.documentProductsViewModel.DeleteById(productRow.Id).subscribe((result:any)=>{
            productsResults.push(result)
            if(productsResults.length==this.productsDataSource.length){
              this.documentsViewModel.DeleteById(this.documentId).subscribe((result:any)=>{
                this._snackBar.open('Record deleted', '', {
                  duration: 1000,
                  panelClass: 'green-snackbar',
                });
                this.router.navigate(['documents-list'])
              })
            }
          })
        });

      } else {
      }
    });
  }

  onBarcodeInput(e: any, index: number) {
    //If product exist in the table
    if (
      this.productsDataSource.some(
        (x) =>
          x.Barcode == this.productsDataSource[index].Barcode &&
          x.IsRowFilled == true
      )
    ) {
      let line = this.productsDataSource.find(
        (x) => x.Barcode == this.productsDataSource[index].Barcode
      );
      let productIndex = this.productsDataSource.indexOf(line!);
      this.productsDataSource[productIndex].ProductQuantity! += 1;
      this.productsDataSource[productIndex].RowTotal =
        this.productsDataSource[productIndex].ProductQuantity! *
        this.productsDataSource[productIndex].Price!;
      e.target.value = '';
    } else {
      //If product doesn't exist in the table
      if (this.barcodesLookupDatasource.includes(e.target.value)) {
        this.documentProductsViewModel
          .GetByBarcode(e.target.value)
          .subscribe((result: any) => {
            this.productsDataSource[index].ProductId = result.ProductId;
            this.productsDataSource[index].Sku = result.Sku;
            this.productsDataSource[index].ProductName = result.ProductName;
            this.productsDataSource[index].ProductSizeId = result.ProductSizeId;
            this.productsDataSource[index].SizeName = result.SizeName;
            this.productsDataSource[index].Price = result.Price;

            this.productsDataSource[index].SerialNumber = index + 1;
            this.productsDataSource[index].RowTotal = result.Price;
            this.productsDataSource[index].ProductQuantity = 1;
            this.productsDataSource[index].ProductNameCopy = result.ProductName;
            this.productsDataSource[index].BarcodeCopy = e.target.value;
            this.productsDataSource[index].IsRowFilled = true;
            let cellsArray = this.cells.toArray();
            cellsArray[index + 1].nativeElement.focus();
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
  }

  displaySizes(value: string) {
    return value ? value : '';
  }
  onSizeSelectionChanged(data: any, index: number) {
    this.productsDataSource[index].ProductSizeId = data.Id;
    if (this.productsDataSource[index].ProductId) {
      this.productBarcodesViewModel
        .GetByProductId(this.productsDataSource[index].ProductId)
        .subscribe((result: any) => {
          let barcode = result.find(
            (x: ProductBarcodeDto) => x.Id == data.Id
          ).Barcode;
          this.productsDataSource[index].Barcode = barcode;
          this.productsDataSource[index].IsRowFilled = true;
          this.productsDataSource[index].SerialNumber = index + 1;
          this.productsDataSource[index].SizeName = data.SizeName;
          let cellsArray = this.cells.toArray();
          cellsArray[index + 1].nativeElement.focus();
        });
    }
  }

  onQuantityChange(e: any, index: number) {
    if (this.productsDataSource[index].Price) {
      this.productsDataSource[index].RowTotal =
        this.productsDataSource[index].Price! * e.target.value;
    } else {
      this.productsDataSource[index].ProductQuantity = undefined;
    }
  }

  onRowTotalChange(e: any, index: number) {
    if (this.productsDataSource[index].Sku) {
      this.productsDataSource[index].RowTotal =
        this.productsDataSource[index].Price! * e.target.value;
    } else {
      this.productsDataSource[index].RowTotal = undefined;
    }
  }

  onPriceChange(e: any, index: number) {
    if (this.productsDataSource[index].ProductQuantity) {
      this.productsDataSource[index].RowTotal =
        this.productsDataSource[index].ProductQuantity! * e.target.value;
    } else {
      this.productsDataSource[index].Price = undefined;
    }
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
  ngOnDestroy() {
    WebAppBase.data = undefined;
  }
}

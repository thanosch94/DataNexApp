import { BrandDto } from './../../dto/brand.dto';
import { ProductBarcodesViewModel } from './../../view-models/product-barcodes.viewmodel';
import { ProductsViewModel } from './../../view-models/products.viewmodel';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CustomersViewModel } from './../../view-models/customers.viewmodel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  @ViewChildren('td') cells: QueryList<ElementRef>;
  @ViewChild('productstable') productstable: MatTable<ProductBarcodeDto>;

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
  nameControl = new FormControl('');
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
  sizeControl = new FormControl('');
  filteredSizes: Observable<ProductBarcodeDto[]>;
  productsSizes = new Array<ProductBarcodeDto>();
  productSizesViewModel: ProductSizesViewModel;
  productBarcodesViewModel: ProductBarcodesViewModel;
  barcodesLookupDatasource: any;

  constructor(private http: HttpClient, private ref: ChangeDetectorRef) {
    this.documentTypesViewModel = new DocumentTypesViewModel(this.http);
    this.productSizesViewModel = new ProductSizesViewModel(this.http);
    this.productBarcodesViewModel = new ProductBarcodesViewModel(this.http);
    this.customersViewModel = new CustomersViewModel(this.http);
    this.documentProductsViewModel = new DocumentProductsViewModel(this.http);
    this.productsViewModel = new ProductsViewModel(this.http);
    for (let i = 0; i < 5; i++) {
      let product = new DocumentProductDto();
      this.productsDataSource.push(product);
    }
  }

  ngOnInit() {
    this.productBarcodesViewModel.GetLookup().subscribe((result: any) => {
      this.barcodesLookupDatasource = result;
    });
    this.documentTypesViewModel.GetAll().subscribe((result: any) => {
      this.docTypes = result;
    });
    this.productsViewModel.GetAll().subscribe((result: any) => {
      this.products = result;
      this.filteredProducts = this.skuControl.valueChanges.pipe(
        startWith(''),
        map((value: string | null) => this._skufilter(value || ''))
      );
    });
    if (this.documentProduct.Id) {
      this.document_text = this.documentProduct.DocumentNumber;
      this.documentProductsViewModel.GetAll().subscribe((result: any) => {
        this.productsDataSource = result;
      });
    } else {
      this.document_text = 'New Document';
      this.document.DocumentDateTime = new Date();
    }
    this.filteredNames = this.nameControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._namefilter(value || ''))
    );

    this.filteredSizes = this.sizeControl.valueChanges.pipe(
      startWith(''),
      map((value: string | null) => this.sizefilter(value || ''))
    );

    this.customersViewModel.GetAll().subscribe((result: any) => {
      this.customers = result;
      this.customers.map((customer: any) => {
        this.customerNames.push(customer.Name);
      });
    });
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
          });
      } else {
        this.productsDataSource[index].Sku = '';
      }
      this.ref.detectChanges();
    });
  }

  onSaveClicked(e: any) {}

  onCloseClicked(e: any) {}

  onDeleteClicked(e: any) {}



  onBarcodeInput(e: any, index: number) {
    if (this.barcodesLookupDatasource.includes(e.target.value)) {
      this.documentProductsViewModel
        .GetByBarcode(e.target.value)
        .subscribe((result: any) => {
          this.productsDataSource[index].SerialNumber = index + 1;

          this.productsDataSource[index].ProductId = result.Id;
          this.productsDataSource[index].Sku = result.Sku;
          this.productsDataSource[index].ProductName = result.ProductName;
          this.productsDataSource[index].ProductNameCopy = result.ProductName;
          this.productsDataSource[index].SizeName = result.SizeName;
          this.productsDataSource[index].Price = result.Price;
          this.productsDataSource[index].RowTotal = result.Price;
          this.productsDataSource[index].ProductQuantity = 1;
          this.productsDataSource[index].BarcodeCopy = e.target.value;
          this.productsDataSource[index].IsRowFilled = true;
          let cellsArray = this.cells.toArray();
          cellsArray[index + 1].nativeElement.focus();
          this.ref.detectChanges();
        });
    } else if (
      this.productsDataSource[index].SerialNumber! >= 0 &&
      this.productsDataSource[index].BarcodeCopy != e.target.value
    ) {
      this.productsDataSource[index].Barcode =
        this.productsDataSource[index].BarcodeCopy;
    }
  }

  removeProduct(e: any, index: number) {
      this.productsDataSource.splice(index,index)
      let product = new DocumentProductDto();
      this.productsDataSource.push(product)
      this.productstable.renderRows();

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
    debugger
    if (index - 1 >= 0) {
      if (this.productsDataSource[index - 1]) {
        if (this.productsDataSource[index - 1].SerialNumber! >= 1) {
          let cellsArray = this.cells.toArray();
          cellsArray[index].nativeElement.focus();
          if(this.productsDataSource.length-1==index){
            let newProductLine = new DocumentProductDto()
            this.productsDataSource.push(newProductLine)
            this.productstable.renderRows();

          }
        } else if (index > 0) {
          let cellsArray = this.cells.toArray();
          cellsArray[index - 1].nativeElement.focus();

        }
      }
    }
  }
}

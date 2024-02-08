import { AsyncPipe, CommonModule } from '@angular/common';
import { CustomersViewModel } from './../../view-models/customers.viewmodel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { CustomerDto } from '../../dto/customer.dto';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DocumentDto } from '../../dto/document.dto';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCell, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DocumentProductDto } from '../../dto/document-product.dto';
import { DocumentProductsViewModel } from '../../view-models/document-products.viewmodel';
import { DocumentTypesViewModel } from '../../view-models/document-types.viewmodel';
import { DocumentTypeDto } from '../../dto/document-type.dto';

@Component({
  selector: 'app-document-edit',
  standalone: true,
  imports: [FormsModule,
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
    AsyncPipe],
    providers:[provideNativeDateAdapter()],
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  customersViewModel: CustomersViewModel;
  customers: any;
  customerNames: string[]= new Array();
  myControl =new FormControl('');
  customer: CustomerDto =new CustomerDto();
  document_text:string
  filteredNames: Observable<string[]>;
  customerPhone:number;
  vatNumber:number;
  documentProduct:DocumentProductDto= new DocumentProductDto();
  docTypes:Array<DocumentTypeDto>
  productsDataSource:Array<DocumentProductDto>= new Array<DocumentProductDto>()
  document:DocumentDto = new DocumentDto()
  productDisplayedColumns: string[] = [
    'Barcode',
    'Sku',
    'ProductName',
    'SizeAbbreviation',
    'ProductQuantity',
    'delete',
  ];
  documentProductsViewModel: DocumentProductsViewModel;
  documentTypesViewModel: DocumentTypesViewModel;
  constructor(private http:HttpClient){
    this.documentTypesViewModel = new DocumentTypesViewModel(this.http)

    this.customersViewModel = new CustomersViewModel(this.http)
    this.documentProductsViewModel = new DocumentProductsViewModel(this.http)

    for(let i=0; i<6; i++){
      let product = new DocumentProductDto()
      this.productsDataSource.push(product)

    }

  }

  ngOnInit() {
    this.documentTypesViewModel.GetAll().subscribe((result:any)=>{
      this.docTypes = result

    })
    if(this.documentProduct.Id){
      this.document_text =this.documentProduct.DocumentNumber
      this.documentProductsViewModel.GetAll().subscribe((result:any)=>{
        this.productsDataSource=result
      })
    }else{
      this.document_text = "New Document"
      this.document.DocumentDateTime = new Date()

      debugger
    }
    this.filteredNames = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );


    this.customersViewModel.GetAll().subscribe((result:any)=>{
      this.customers= result
      this.customers.map((customer:any)=>{
        this.customerNames.push(customer.Name)
      })
    })


  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.customerNames.filter(name => name.toLowerCase().includes(filterValue));
  }

  onNameSelection(name:string){
    this.customer = this.customers.find((customer:CustomerDto) => customer.Name==name);
  }

  onSaveClicked(e:any){

  }

  onCloseClicked(e:any){

  }

  onDeleteClicked(e:any){

  }

  addProduct(e:any){

  }

  removeProduct(e:any){

  }

}

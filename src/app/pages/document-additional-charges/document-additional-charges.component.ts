import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentAdditionalChargeDto } from '../../dto/document-additional-charge.dto';
import { MatCell, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { AdditionalChargeDto } from '../../dto/additional-charge.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentAdditionalChargesViewModel } from '../../view-models/document-additional-charges.viewmodel';
import { AuthService } from '../../services/auth.service';
import { Guid } from 'guid-typescript';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { AdditionalChargesViewModel } from '../../view-models/additional-charges.viewmodel';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-document-additional-charges',
  standalone: true,
  imports: [MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatCell,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortHeader,
    DnToolbarComponent,
    MatTooltipModule,
    DnToolbarComponent,
    CommonModule,
    DnGridComponent,
    ],
  templateUrl: './document-additional-charges.component.html',
  styleUrl: './document-additional-charges.component.css'
})
export class DocumentAdditionalChargesComponent implements OnInit{
  @ViewChild('documentAdditionalCharges') documentAdditionalChargesGrid:DnGridComponent
  documentId: Guid
  document_additionl_charges_text: string;
  dataSource: DocumentAdditionalChargeDto[] = new Array<DocumentAdditionalChargeDto>;
  columns:DnColumnDto[];
  documentAdditionalChargesViewModel: DocumentAdditionalChargesViewModel;
  additionalChargesViewModel: AdditionalChargesViewModel;
  additionalChargesDataSource: any;
  constructor(private http:HttpClient, private auth:AuthService, private _snackBar:MatSnackBar, @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any){
    this.documentAdditionalChargesViewModel = new DocumentAdditionalChargesViewModel(this.http, this.auth)
    this.additionalChargesViewModel = new AdditionalChargesViewModel(this.http, this.auth)
    this.documentId =dialogData.DocumentId
  }

  ngOnInit(): void {
    this.document_additionl_charges_text = "Additional Charges"
    this.getDocumentAdditionalCharges();
    this.getColumns()
  }

  getDocumentAdditionalCharges(){
    if(this.documentId){
      this.documentAdditionalChargesViewModel.GetByDocumentId(this.documentId).subscribe((result:any)=>{
        if(result){
          this.dataSource = result;
        }
      })
    }
  }

  getColumns() {
    this.additionalChargesViewModel.GetAll().subscribe((result:any)=>{
      this.additionalChargesDataSource = result
    this.columns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'AdditionalChargeId',
        DataType: 'string',
        Caption: 'Charge',
        Lookup: {
          DataSource: this.additionalChargesDataSource,
          ValueExpr:'Id',
          DisplayExpr:'Name'
        }
      },
      {
        DataField: 'AdditionalChargeAmount',
        DataType: 'number',
        Caption: 'Amount',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  })
  }

  onCloseBtnClicked(e:any){

  }

  onDocumentAdditionalChargeRowSaving(data:any){
    let newAdditionalCharge = new DocumentAdditionalChargeDto();

    if (data.Id) {
      newAdditionalCharge.Id = data.Id;
    }
    newAdditionalCharge.DocumentId = this.documentId
    newAdditionalCharge.AdditionalChargeId = data.AdditionalChargeId;
    newAdditionalCharge.AdditionalChargeName = data.AdditionalChargeName;
    newAdditionalCharge.AdditionalChargeAmount = data.AdditionalChargeAmount;

    if (!newAdditionalCharge.Id) {
      this.documentAdditionalChargesViewModel
        .InsertDto(newAdditionalCharge)
        .subscribe((result: any) => {
          this.displayNotification("Record inserted");
          this.getDocumentAdditionalCharges()

        });
    } else {
      this.documentAdditionalChargesViewModel
        .UpdateDto(newAdditionalCharge)
        .subscribe((result: any) => {
          this.displayNotification("Record updated");
          this.getDocumentAdditionalCharges()
        });
    }
  }

  removeAdditionalCharge(e:any){

  }

  onDocumentAdditionalChargeRowStopEditing(e:any){
    this.getDocumentAdditionalCharges()
  }

  onDocumentAdditionalChargeRowDeleting(data:any){
    this.documentAdditionalChargesViewModel
    .DeleteById(data.Id)
    .subscribe((result: any) => {
      let index = this.documentAdditionalChargesGrid.matDataSource.data.indexOf(data)
      this.documentAdditionalChargesGrid.matDataSource.data.splice(index,1)
      this.getDocumentAdditionalCharges()
      this.documentAdditionalChargesGrid.table.renderRows()
      this.displayNotification("Record deleted");

    });
  }

  onInsertBtnClicked(e:any){
    this.documentAdditionalChargesGrid.add(e)
  }

  displayNotification(text:string){
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
      });
  }
}

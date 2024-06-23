import { Component, OnInit, ViewChild } from '@angular/core';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { AdditionalChargesViewModel } from '../../view-models/additional-charges.viewmodel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { AdditionalChargeDto } from '../../dto/additional-charge.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-additional-charges',
  standalone: true,
  imports: [
    DnToolbarComponent,
    DnGridComponent
  ],
  templateUrl: './additional-charges-list.component.html',
  styleUrl: './additional-charges-list.component.css'
})
export class AdditionalChargesListComponent implements OnInit{
  @ViewChild('additionalChargesGrid') additionalChargesGrid:DnGridComponent

  additionl_charges_text: any;
  dataSource:any
  columns:any[] = []
  additionalChargesViewModel: AdditionalChargesViewModel;
  constructor(private http: HttpClient, private auth:AuthService, private _snackBar:MatSnackBar, private dialog:MatDialog){
    this.additionalChargesViewModel = new AdditionalChargesViewModel(this.http, this.auth)

  }

  ngOnInit() {
    this.additionl_charges_text = "Additional Charges List"
    this.getData()
    this.getColumns()
  }

  getData(){
    this.additionalChargesViewModel.GetAll().subscribe((result:any)=>{
      this.dataSource = result
    })
  }

  getColumns(){
    this.columns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ]
  }

  onCloseBtnClicked(e:any){

  }

  onInsertBtnClicked(e:any){
    this.additionalChargesGrid.add(e)
  }

  onAdditionalChargeRowSaving(data:AdditionalChargeDto){
 let newAdditionalCharge = new AdditionalChargeDto();
    if (data.Id) {
      newAdditionalCharge.Id = data.Id;
    }
    newAdditionalCharge.Name = data.Name

    if (!newAdditionalCharge.Id) {
      this.additionalChargesViewModel
        .InsertDto(newAdditionalCharge)
        .subscribe( {
          next: (result) => {
          this.displayNotification("Record inserted");
          this.getData()
          },
          error:(err)=>{
            const dialog = this.dialog.open(DnAlertComponent, {
              data: {
                Title: 'Message',
                Message: err.error.innerExceptionMessage,
              },
            });
            this.getData()
          }
        });
    } else {
      this.additionalChargesViewModel
        .UpdateDto(newAdditionalCharge)
        .subscribe((result: any) => {
          this.displayNotification("Record updated");
          this.getData()
        });
    }
  }

  onAdditionalChargeRowStopEditing(e:any){
    this.getData()
  }

  onAdditionalChargeRowDelete(data: AdditionalChargeDto) {
    this.additionalChargesViewModel
      .DeleteById(data.Id)
      .subscribe((result: any) => {
        let index = this.additionalChargesGrid.matDataSource.data.indexOf(data)
        this.additionalChargesGrid.matDataSource.data.splice(index,1)
        this.getData()
        this.additionalChargesGrid.table.renderRows()
        this.displayNotification("Record deleted");

      });
  }

  displayNotification(text:string){
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
      });
  }
}

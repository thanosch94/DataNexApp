import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { LotsViewModel } from '../../../view-models/lots.viewmodel';
import { LotDto } from '../../../dto/configuration/lot.dto';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { LotsSettingsComponent } from '../lots-settings/lots-settings.component';

@Component({
  selector: 'app-lots-list',
  standalone: true,
  imports: [DnToolbarComponent, DnGridComponent],
  templateUrl: './lots-list.component.html',
  styleUrl: './lots-list.component.css',
})
export class LotslistComponent implements OnInit {
  @ViewChild('lotsGrid') lotsGrid: DnGridComponent;

  lots_title_text: string = 'Lots';
  columns: DnColumnDto[];
  lotsViewModel: LotsViewModel;
  dataSource: LotDto[];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private dialog:MatDialog,
    private viewContainerRef: ViewContainerRef

  ) {
    this.lotsViewModel = new LotsViewModel(this.http, this.auth);
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.lotsViewModel.GetAll().subscribe((result: LotDto[]) => {
      next: {
        this.dataSource = result;
      }
    });
  }

  getColumns() {
    this.columns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
        ReadOnly: true,
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'ProdDate',
        DataType: 'datetime',
        Caption: 'Production Date',
        Format: 'dd/MM/yyyy'
      },
      {
        DataField: 'ExpDate',
        DataType: 'datetime',
        Caption: 'Expiration Date',
        Format: 'dd/MM/yyyy'
      },
      {
        DataField: 'Notes',
        DataType: 'string',
        Caption: 'Notes',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onInsertClicked(e: any) {
    this.lotsGrid.add(e);
  }

  onRowSaving(data: any) {
    let newLot = new LotDto();

    if (data.Id) {
      newLot.Id = data.Id;
    }
    newLot.Name = data.Name;
    newLot.ProdDate = new Date(data.ProdDate + 'Z').toISOString();
    newLot.ExpDate = new Date(data.ExpDate + 'Z').toISOString();
    newLot.Notes = data.Notes;

    if (!newLot.Id) {
      this.lotsViewModel.InsertDto(newLot).subscribe((result: any) => {
        next:{
          this.displayNotification('Record inserted');
          this.getData();
        }

      });
    } else {
      this.lotsViewModel.UpdateDto(newLot).subscribe((result: any) => {
        next:{
          this.displayNotification('Record updated');
          this.getData();
        }

      });
    }
  }

  onRowStopEditing(e: any) {
    this.getData()
  }

  onRowDeleting(data: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '320px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((confirm:any) => {
      if (confirm) {
        this.deleteItem(data);
      } else {
        //No action
      }
    });
  }

  deleteItem(data:any){
    this.lotsViewModel.DeleteById(data.Id).subscribe((result: any) => {
      next: {
        if (result) {
          this.getData();
          this.displayNotification('Record deleted');
        }
      }
    });
  }

  onSettingsClicked(e:any){
    const dialogRef = this.dialog.open(LotsSettingsComponent, {
      width:'500px',
      height:'500px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
      viewContainerRef: this.viewContainerRef,

    });
  }

  displayNotification(text: string) {
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
  }
}

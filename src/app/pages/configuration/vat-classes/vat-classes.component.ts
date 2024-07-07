import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { VatClassesViewModel } from '../../../view-models/vat-classes.viewmodel';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TabsService } from '../../../services/tabs.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { VatClassDto } from '../../../dto/vat-class.dto';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';

@Component({
  selector: 'app-vat-classes',
  standalone: true,
  imports: [DnGridComponent, DnToolbarComponent],
  templateUrl: './vat-classes.component.html',
  styleUrl: './vat-classes.component.css'
})
export class VatClassesComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('vatClassesGrid')
  vatClassesGrid: DnGridComponent;
  vatClassesDataSource: any;
  vatClass: any;
  vatClassesViewModel: VatClassesViewModel;
  document_types_list_title_text: string;
  vatClassesColumns: DnColumnDto[] = [];
  chartOptions: any;
  vat_classes_list_title_text: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private tabsService: TabsService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.vatClassesViewModel = new VatClassesViewModel(
      this.http,
      this.auth
    );

    this.vat_classes_list_title_text = 'Vat Classes List';
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.vatClassesViewModel.GetAll().subscribe((result: any) => {
      this.vatClassesDataSource = result;
    });
  }
  getColumns() {
    this.vatClassesColumns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Abbreviation',
        DataType: 'string',
        Caption: 'Abbreviation',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Rate',
        DataType: 'number',
        Caption: 'Rate',
      },
      {
        DataField: 'Decription',
        DataType: 'string',
        Caption: 'Decription',
        Visible: false,
      },
      {
        DataField: 'IsActive',
        DataType: 'boolean',
        Caption: 'Is Active',
        Visible: true,
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  onInsertClicked(e: any) {
    this.vatClassesGrid.add(e);
  }

  onVatClassSaving(data: VatClassDto) {
    let vatClass = new VatClassDto();

    if (data.Id) {
      vatClass.Id = data.Id;
    }
    vatClass.Name = data.Name;
    vatClass.Abbreviation = data.Abbreviation;
    vatClass.Description = data.Description;
    vatClass.Rate  =data.Rate
    vatClass.IsActive = data.IsActive;

    if (!vatClass.Id) {
      this.vatClassesViewModel
        .InsertDto(vatClass)
        .subscribe((result: any) => {
          this.displayNotification('Record inserted');
          this.getData();
        });
    } else {
      if (data.Id)
        this.vatClassesViewModel.UpdateDto(vatClass).subscribe({
          next: (result: any) => {
            this.displayNotification('Record updated');
            this.getData();
          },
          error:(err:any)=>{
            const dialog = this.dialog.open(DnAlertComponent, {
              data: {
                Title: 'Message',
                Message: err.error,
              },
            });
            this.getData()
          }
        });

    }
  }

  onVatClassDelete(data: VatClassDto) {
    this.vatClassesViewModel.DeleteById(data.Id).subscribe({
      next: (result: any) => {
        let index = this.vatClassesGrid.matDataSource.data.indexOf(data);
        this.vatClassesGrid.matDataSource.data.splice(index, 1);
        this.getData();
        this.vatClassesGrid.table.renderRows();
        this.displayNotification('Record deleted');
      },
      error: (err: any) => {
        const dialog = this.dialog.open(DnAlertComponent, {
          data: {
            Title: 'Message',
            Message: err.error,
          },
        });
      },
    });
  }

  onVatClassStopEditing(e: any) {
    this.getData();
  }

  displayNotification(text: string) {
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
  }

  onRefreshClicked(e: any) {
    this.getData();
    this.vatClassesGrid.renderRows();
  }
}

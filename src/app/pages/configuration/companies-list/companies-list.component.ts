import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { AuthService } from '../../../services/auth.service';
import { TabsService } from '../../../services/tabs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CompanyDto } from '../../../dto/company.dto';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { CompaniesViewModel } from '../../../view-models/companies.viewmodel';

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,

    HttpClientModule,
    DnToolbarComponent,
    MatTooltipModule,
    DnGridComponent,
    FontAwesomeModule,
  ],
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.css',
})
export class CompaniesListComponent {
  @ViewChild('companiesGrid')
  companiesGrid: DnGridComponent;
  companiesDataSource: any;
  company: any;
  companiesViewModel: CompaniesViewModel;
  companies_list_title_text: string;
  companiesColumns: DnColumnDto[] = [];
  chartOptions: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private tabsService: TabsService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.companiesViewModel = new CompaniesViewModel(this.http, this.auth);

    this.companies_list_title_text = 'Document Types List';
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.companiesViewModel.GetAll().subscribe((result: any) => {
      this.companiesDataSource = result;
    });
  }
  getColumns() {
    this.companiesColumns = [
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
        DataField: 'IsDefault',
        DataType: 'boolean',
        Caption: 'Is Default',
        Visible: true,
        DefaultValue: false
      },
      {
        DataField: 'IsActive',
        DataType: 'boolean',
        Caption: 'Is Active',
        Visible: true,
        DefaultValue: true

      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  onInsertClicked(e: any) {
    this.companiesGrid.add(e);
  }

  onCompanySaving(data: CompanyDto) {
    let company = new CompanyDto();

    if (data.Id) {
      company.Id = data.Id;
    }
    company.Name = data.Name;
    company.IsDefault = data.IsDefault;

    if (!company.Id) {
      this.companiesViewModel.InsertDto(company).subscribe({
        next: (result: any) => {
          this.displayNotification('Record inserted');
          this.getData();
        },
        error: (err: any) => {
          this.getData();

          const dialog = this.dialog.open(DnAlertComponent, {
            data: {
              Title: 'Message',
              Message: err.error,
            },
          });
        },
      });
    } else {
      if (data.Id)
        this.companiesViewModel.UpdateDto(company).subscribe({
          next: (result: any) => {
            this.displayNotification('Record updated');
            this.getData();
          },
          error: (err: any) => {
            const dialog = this.dialog.open(DnAlertComponent, {
              data: {
                Title: 'Message',
                Message: err.error,
              },
            });
            this.getData();
          },
        });
    }
  }

  onCompanyDelete(data: CompanyDto) {
    this.companiesViewModel.DeleteById(data.Id).subscribe({
      next: (result: any) => {
        let index = this.companiesGrid.matDataSource.data.indexOf(data);
        this.companiesGrid.matDataSource.data.splice(index, 1);
        this.getData();
        this.companiesGrid.table.renderRows();
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

  onCompaniesStopEditing(e: any) {
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
    this.companiesGrid.renderRows();
  }
}

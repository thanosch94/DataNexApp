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
import { Store } from '@ngrx/store';
import {
  DeleteCompanyById,
  DeleteCompanyByIdFailure,
  DeleteCompanyByIdSuccess,
  GetAllCompanies,
  InsertCompanyDto,
  InsertCompanyDtoSuccess,
  UpdateCompanyDto,
  UpdateCompanyDtoFailure,
  UpdateCompanyDtoSuccess,
} from '../../../state/parameters/companies/companies.actions';
import { selectAllCompanies } from '../../../state/parameters/companies/companies.selectors';
import { AsyncPipe } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '../../components/base/base.component';

@Component({
  selector: 'app-companies-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.css',
})
export class CompaniesListComponent extends BaseComponent {
  @ViewChild('companiesGrid')
  companiesGrid: DnGridComponent;
  dataSource: any;
  company: any;
  companies_list_title_text: string;
  columns: DnColumnDto[] = [];
  chartOptions: any;

  constructor(private store: Store, private actions$: Actions) {
    super();
    this.companies_list_title_text = 'Document Types List';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
  }

  setActionsResults() {
    this.setInsertDtoSuccessActionResult();
    this.setUpdateDtoSuccessActionResult();
    this.setUpdateDtoFailureActionResult();
    this.setDeleteByIdSuccessActionResult();
    this.setDeleteByIdFailureActionResult();
  }

  setInsertDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(InsertCompanyDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record inserted');
        this.getData();
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(UpdateCompanyDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record updated');
        this.getData();
      });
  }

  setUpdateDtoFailureActionResult() {
    this.actions$
      .pipe(ofType(UpdateCompanyDtoFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteCompanyByIdSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.getData();
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteCompanyByIdFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  getData() {
    this.store.dispatch(GetAllCompanies());
    this.dataSource = this.store.select(selectAllCompanies);
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
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'IsDefault',
        DataType: 'boolean',
        Caption: 'Is Default',
        Visible: true,
        DefaultValue: false,
      },
      {
        DataField: 'IsActive',
        DataType: 'boolean',
        Caption: 'Is Active',
        Visible: true,
        DefaultValue: true,
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
    let company: CompanyDto = { ...data };

    if (!company.Id) {
      this.store.dispatch(InsertCompanyDto({ dto: company }));
    } else {
      this.store.dispatch(UpdateCompanyDto({ dto: company }));
    }
  }

  onCompanyDelete(data: CompanyDto) {
    this.store.dispatch(DeleteCompanyById({ id: data.Id }));
  }

  onCompaniesStopEditing(e: any) {
    this.getData();
  }

  onRefreshClicked(e: any) {
    this.getData();
  }
}

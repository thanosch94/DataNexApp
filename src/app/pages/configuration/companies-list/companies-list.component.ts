import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { CompanyDto } from '../../../dto/company.dto';
import {
  DeleteCompanyById,
  DeleteCompanyByIdFailure,
  DeleteCompanyByIdSuccess,
  GetAllCompanies,
  InsertCompanyDto,
  InsertCompanyDtoFailure,
  InsertCompanyDtoSuccess,
  UpdateCompanyDto,
  UpdateCompanyDtoFailure,
  UpdateCompanyDtoSuccess,
} from '../../../state/parameters/companies/companies.actions';
import { selectAllCompanies } from '../../../state/parameters/companies/companies.selectors';
import { AsyncPipe } from '@angular/common';
import { BaseComponent } from '../../components/base/base.component';
import { ColumnsService } from '../../../services/columns.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-companies-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.css',
})
export class CompaniesListComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('companiesGrid')
  companiesGrid: DnGridComponent;
  dataSource: any;
  companies_list_title_text: string;
  columns: DnColumnDto[] = [];
  chartOptions: any;
  private destroy$ = new Subject<void>();

  constructor(
    private columnsService: ColumnsService,
  ) {
    super();
    this.companies_list_title_text = 'Companies List';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
  }

  getData() {
    this.store.dispatch(GetAllCompanies());
    this.dataSource = this.store.select(selectAllCompanies);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns('Companies');
  }

  onInsertClicked(e: any) {
    this.companiesGrid.add(e);
  }

  onCompanySaving(data: CompanyDto) {
    let dto: CompanyDto = { ...data };

    if (!dto.Id) {
      this.store.dispatch(InsertCompanyDto({ dto }));
    } else {
      this.store.dispatch(UpdateCompanyDto({ dto }));
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

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertCompanyDtoSuccess,
        insertFailure: InsertCompanyDtoFailure,
        updateSuccess: UpdateCompanyDtoSuccess,
        updateFailure: UpdateCompanyDtoFailure,
        deleteSuccess: DeleteCompanyByIdSuccess,
        deleteFailure: DeleteCompanyByIdFailure,
      },
      {
        insertSuccess: () => {
          this.displayNotification('Record inserted');
          this.getData();
        },
        insertFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateSuccess: () => {
          this.displayNotification('Record updated');
          this.getData();
        },
        updateFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        deleteSuccess: () => {
          this.displayNotification('Record deleted');
          this.getData();
        },
        deleteFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
      },
      this.destroy$
    );
  }
  //#endregion

    ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

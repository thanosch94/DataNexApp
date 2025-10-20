import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DocumentsViewModel } from '../../../view-models/documents.viewmodel';
import { ListWithFiltersComponent } from '../../list-with-filters/list-with-filters.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { BaseComponent } from '../../components/base/base.component';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import { DocumentDto } from '../../../dto/document.dto';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-accounts-receivable',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './accounts-receivable.component.html',
  styleUrl: './accounts-receivable.component.css',
})
export class AccountsReceivableComponent
  extends BaseComponent
  implements OnInit
{
  accounts_receivable_list_text: string = 'Accounts Receivable';
  documentsViewModel: DocumentsViewModel;
  customersDocumentsColumns: DnColumnDto[];
  dataSource$: Observable<DocumentDto[]>;
  columns: DnColumnDto[] = [];

  constructor(private columnsService: ColumnsService) {
    super();
  }

  ngOnInit(): void {
    this.getColumns();
    this.getData();
  }

  getData() {
    this.dataSource$ = this.documentsViewModel.GetaAccountsReceivableListData();
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(
      GridColumns.AccountsReceivable
    );
    this.customersDocumentsColumns = this.columnsService.getColumns(
      GridColumns.AccountsReceivableCustomerDocuments
    );
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onInfoBtnClicked(row: any) {
    this.documentsViewModel
      .GetChargeableDocumentsByCustomerId(row.CustomerId)
      .subscribe((result: any) => {
        this.dialog.open(ListWithFiltersComponent, {
          width: '60%',
          height: '80%',
          data: {
            Title: 'Documents List',
            DataSource: result,
            Columns: this.customersDocumentsColumns,
          },
        });
      });
  }
}

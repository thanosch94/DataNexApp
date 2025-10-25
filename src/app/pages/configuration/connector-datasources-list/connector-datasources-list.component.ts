import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { BaseComponent } from '../../components/base/base.component';
import { AsyncPipe } from '@angular/common';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { selectAllCntorDatasources } from '../../../state/parameters/connector-datasources/cntor-datasources.selectors';
import {
  DeleteCntorDatasource,
  GetAllCntorDatasources,
  InsertCntorDatasource,
  UpdateCntorDatasource,
} from '../../../state/parameters/connector-datasources/cntor-datasources.actions';
import { CntorDatasourceDto } from '../../../dto/configuration/cntor-datasource.dto';
import { ColumnsService } from '../../../services/columns.service';
import { Subject } from 'rxjs';
import { GridColumns } from '../../../base/grid-columns';

@Component({
  selector: 'app-connector-datasources-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './connector-datasources-list.component.html',
  styleUrl: './connector-datasources-list.component.css',
})
export class ConnectorDatasourcesListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('cntorDatasourcesGrid')
  cntorDatasourcesGrid: DnGridComponent;

  connector_datasources_list_text: string;
  dataSource: any;
  columns: DnColumnDto[];
  private destroy$ = new Subject<void>();

  constructor(
    private columnsService: ColumnsService,
  ) {
    super();
    this.connector_datasources_list_text = 'Connector Datasources';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getColumns();
    this.getData();
  }

  getData() {
    this.store.dispatch(GetAllCntorDatasources.action());
    this.dataSource = this.store.select(selectAllCntorDatasources);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.CntorDatasources);
  }

  onInsertClicked(e: any) {
    this.cntorDatasourcesGrid.add(e);
  }

  onRowSaving(data: any) {
    let dto: CntorDatasourceDto = { ...data };

    if (!dto.Id) {
      this.store.dispatch(InsertCntorDatasource.action({ dto }));
    } else {
      this.store.dispatch(UpdateCntorDatasource.action({ dto }));
    }
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onRowStopEditing(e: any) {
    this.getData();
  }

  onRowDelete(data: any) {
    this.store.dispatch(DeleteCntorDatasource.action({ id: data.Id }));
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertCntorDatasource.actionSuccess,
        insertFailure: InsertCntorDatasource.actionFailure,
        updateSuccess: UpdateCntorDatasource.actionSuccess,
        updateFailure: UpdateCntorDatasource.actionFailure,
        deleteSuccess: DeleteCntorDatasource.actionSuccess,
        deleteFailure: DeleteCntorDatasource.actionFailure,
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { AsyncPipe } from '@angular/common';
import { CntorDatasourceEntityDto } from '../../../dto/configuration/cntor-datasource-entity.dto';
import { BaseComponent } from '../../components/base/base.component';
import {
  DeleteCntorDatasourceEntity,
  GetAllCntorDatasourceEntities,
  InsertCntorDatasourceEntity,
  UpdateCntorDatasourceEntity,
} from '../../../state/parameters/cntor-datasource-entities/cntor-datasource-entities.actions';
import { selectAllCntorDatasourceEntities } from '../../../state/parameters/cntor-datasource-entities/cntor-datasource-entities.selectors';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cntor-datasource-entities-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './cntor-datasource-entities-list.component.html',
  styleUrl: './cntor-datasource-entities-list.component.css',
})
export class CntorDatasourceEntitiesListComponent
  extends BaseComponent
  implements OnInit
{
  @ViewChild('cntorDatasourceEntitiesGrid')
  cntorDatasourceEntitiesGrid: DnGridComponent;

  connector_datasource_entities_list_text: string;
  columns: DnColumnDto[];
  dataSource: any;
  private destroy$ = new Subject<void>();

  constructor(private columnsService: ColumnsService) {
    super();
    this.connector_datasource_entities_list_text =
      'Connector Datasource Entities List';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getColumns();
    this.getData();
  }

  getData() {
    this.store.dispatch(GetAllCntorDatasourceEntities.action());
    this.dataSource = this.store.select(selectAllCntorDatasourceEntities);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(
      GridColumns.CntorDatasourceEntities
    );
  }

  onInsertClicked(e: any) {
    this.cntorDatasourceEntitiesGrid.add(e);
  }

  onRowSaving(data: any) {
    let dto: CntorDatasourceEntityDto = { ...data };

    if (!dto.Id) {
      this.store.dispatch(InsertCntorDatasourceEntity.action({ dto }));
    } else {
      this.store.dispatch(UpdateCntorDatasourceEntity.action({ dto }));
    }
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onRowStopEditing(e: any) {
    this.getData();
  }

  onRowDelete(data: any) {
    this.store.dispatch(DeleteCntorDatasourceEntity.action({ id: data.Id }));
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertCntorDatasourceEntity.actionSuccess,
        insertFailure: InsertCntorDatasourceEntity.actionFailure,
        updateSuccess: UpdateCntorDatasourceEntity.actionSuccess,
        updateFailure: UpdateCntorDatasourceEntity.actionFailure,
        deleteSuccess: DeleteCntorDatasourceEntity.actionSuccess,
        deleteFailure: DeleteCntorDatasourceEntity.actionFailure,
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

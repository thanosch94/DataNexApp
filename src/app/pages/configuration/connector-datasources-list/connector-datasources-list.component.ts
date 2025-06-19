import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Actions, ofType } from '@ngrx/effects';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { CntorDatasourceDto } from '../../../dto/configuration/cntor-datasource.dto';

@Component({
  selector: 'app-connector-datasources-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './connector-datasources-list.component.html',
  styleUrl: './connector-datasources-list.component.css',
})
export class ConnectorDatasourcesListComponent
  extends BaseComponent
  implements OnInit
{
  @ViewChild('cntorDatasourcesGrid')
  cntorDatasourcesGrid: DnGridComponent;

  connector_datasources_list_text: string;
  dataSource: any;
  columns: DnColumnDto[];

  constructor(private actions$: Actions) {
    super();
    this.connector_datasources_list_text = 'Connector Datasources';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getColumns();
    this.getData();
  }
  setActionsResults() {
    this.setInsertDtoSuccessActionResult();
    this.setUpdateDtoSuccessActionResult();
    this.setDeleteByIdSuccessActionResult();
    this.setDeleteByIdFailureActionResult();
  }

  setInsertDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(InsertCntorDatasource.actionSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record inserted');
        this.getData();
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(UpdateCntorDatasource.actionSuccess))
      .subscribe((result: any) => {
        this.getData();
        this.displayNotification('Record updated');
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteCntorDatasource.actionSuccess))
      .subscribe((result: any) => {
        this.getData();
        this.displayNotification('Record deleted');
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteCntorDatasource.actionFailure))
      .subscribe((result: any) => {
        const dialog = this.dialog.open(DnAlertComponent, {
          data: {
            Title: 'Message',
            Message: result.error.error.innerExceptionMessage,
          },
        });
      });
  }

  getData() {
    this.store.dispatch(GetAllCntorDatasources.action());
    this.dataSource = this.store.select(selectAllCntorDatasources);
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
        DataField: 'Description',
        DataType: 'string',
        Caption: 'Description',
      },
      {
        DataField: 'Icon',
        DataType: 'string',
        Caption: 'Icon',
      },
      {
        DataField: 'IconColor',
        DataType: 'string',
        Caption: 'IconColor',
      },
      {
        DataField: 'HasCustomImage',
        DataType: 'boolean',
        Caption: 'HasCustomImage',
      },
      {
        DataField: 'CustomImagePath',
        DataType: 'string',
        Caption: 'CustomImagePath',
      },
      {
        DataField: 'CustomImageWidth',
        DataType: 'number',
        Caption: 'CustomImageWidth',
      },
      {
        DataField: 'CompanyId',
        Visible: false,
        DataType: 'string',
        Caption: 'CompanyId',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  onInsertClicked(e: any) {
    this.cntorDatasourcesGrid.add(e);
  }

  onRowSaving(data: any) {
    let dto:CntorDatasourceDto={...data};
    if (data.Id) {
      dto.Id = data.Id;
    }

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
}

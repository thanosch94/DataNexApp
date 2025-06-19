import { Component, OnInit, ViewChild } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { AsyncPipe } from '@angular/common';
import { CntorDatasourceEntityDto } from '../../../dto/configuration/cntor-datasource-entity.dto';
import { BaseComponent } from '../../components/base/base.component';
import { DeleteCntorDatasourceEntity, GetAllCntorDatasourceEntities, InsertCntorDatasourceEntity, UpdateCntorDatasourceEntity } from '../../../state/parameters/cntor-datasource-entities/cntor-datasource-entities.actions';
import { selectAllCntorDatasourceEntities } from '../../../state/parameters/cntor-datasource-entities/cntor-datasource-entities.selectors';
import { GetAllCntorDatasources } from '../../../state/parameters/connector-datasources/cntor-datasources.actions';
import { selectAllCntorDatasources } from '../../../state/parameters/connector-datasources/cntor-datasources.selectors';

@Component({
  selector: 'app-cntor-datasource-entities-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './cntor-datasource-entities-list.component.html',
  styleUrl: './cntor-datasource-entities-list.component.css',
})
export class CntorDatasourceEntitiesListComponent extends BaseComponent implements OnInit{
  @ViewChild('cntorDatasourceEntitiesGrid')
  cntorDatasourceEntitiesGrid: DnGridComponent;

  connector_datasource_entities_list_text: string;
  columns: DnColumnDto[];
  dataSource:any;
  cntorDatasources:any;
  constructor() {
    super()
    this.connector_datasource_entities_list_text =
      'Connector Datasource Entities List';
  }

   ngOnInit() {
    this.getColumns()
    this.getData()

  }

  getData() {
    this.store.dispatch(GetAllCntorDatasourceEntities.action());
    this.dataSource = this.store.select(selectAllCntorDatasourceEntities);
  }

  getColumns() {
    this.store.dispatch(GetAllCntorDatasources.action());
    let cntorDatasources$ = this.store.select(selectAllCntorDatasources);

    cntorDatasources$.subscribe((result:any)=>{
      this.cntorDatasources=result;
    this.columns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'CntorDatasourceId',
        DataType: 'string',
        Caption: 'Datasource',
        Lookup:{
          DataSource:this.cntorDatasources,
          ValueExpr:'Id',
          DisplayExpr:'Name'
        }
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
    })


  }

  onInsertClicked(e: any) {
    this.cntorDatasourceEntitiesGrid.add(e);
  }

  onRowSaving(data: any) {
    let dto: CntorDatasourceEntityDto = { ...data };
    if (data.Id) {
      dto.Id = data.Id;
    }

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
}

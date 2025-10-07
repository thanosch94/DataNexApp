import { Observable, Subject } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { WarehouseDto } from '../../../dto/inventory/warehouse.dto';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { BaseComponent } from '../../components/base/base.component';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import {
  DeleteWarehouse,
  GetAllWarehouses,
  InsertWarehouse,
  UpdateWarehouse,
} from '../../../state/parameters/warehouses/warehouses.actions';
import { selectAllWarehouses } from '../../../state/parameters/warehouses/warehouses.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-warehouses-list',
  imports: [DnGridComponent, DnToolbarComponent, FontAwesomeModule, AsyncPipe],
  templateUrl: './warehouses-list.component.html',
  styleUrl: './warehouses-list.component.css',
})
export class WarehousesListComponent extends BaseComponent {
  @ViewChild('warehousesGrid') warehousesGrid: DnGridComponent;
  warehouses_list_title_text: string;
  columns: DnColumnDto[] = [];
  dataSource$: Observable<any>;
  private destroy$ = new Subject<void>();

  constructor(private columnsService: ColumnsService) {
    super();
    this.warehouses_list_title_text = 'Warehouses List';
    this.tabsService.setTabName(this.warehouses_list_title_text);
  }

  ngOnInit() {
    this.setActionsResults()
    this.getColumns();
    this.getData();
  }

  getData() {
    this.store.dispatch(GetAllWarehouses.action());
    this.dataSource$ = this.store.select(selectAllWarehouses);
  }
  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.WarehousesList);
  }

  onInsertBtnClicked(e: any) {
    this.warehousesGrid.add(e);
  }

  onWareHouseSaving(data: WarehouseDto) {
    let dto: WarehouseDto = { ...data };

    if (!dto.Id) {
      this.store.dispatch(InsertWarehouse.action({ dto }));
    } else {
      this.store.dispatch(UpdateWarehouse.action({ dto }));
    }
  }

  onWareHouseDelete(data: WarehouseDto) {
    this.store.dispatch(DeleteWarehouse.action({ id: data.Id }));
  }

  onWareHouseStopEditing(e: any) {
    this.getData();
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertWarehouse.actionSuccess,
        insertFailure: InsertWarehouse.actionFailure,
        updateSuccess: UpdateWarehouse.actionSuccess,
        updateFailure: UpdateWarehouse.actionFailure,
        deleteSuccess: DeleteWarehouse.actionSuccess,
        deleteFailure: DeleteWarehouse.actionFailure,
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
          debugger
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

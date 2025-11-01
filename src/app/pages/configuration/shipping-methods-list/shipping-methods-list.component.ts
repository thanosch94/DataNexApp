import { Component, Input, OnDestroy, OnInit, output, ViewChild } from '@angular/core';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { BaseComponent } from '../../components/base/base.component';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import { ShippingMethodDto } from '../../../dto/shipping-method.dto';
import { DeleteShippingMethod, GetAllShippingMethods, InsertShippingMethod, UpdateShippingMethod } from '../../../state/parameters/shipping-methods/shipping-methods.actions';
import { selectAllShippingMethods } from '../../../state/parameters/shipping-methods/shipping-methods.selectors';

@Component({
  selector: 'shipping-methods-list',
  imports: [DnGridComponent, DnToolbarComponent, AsyncPipe],
  templateUrl: './shipping-methods-list.component.html',
  styleUrls: ['./shipping-methods-list.component.css']
})
export class ShippingMethodsListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('shippingMethodsGrid')
  shippingMethodsGrid: DnGridComponent;
  dataSource: Observable<ShippingMethodDto[]>;
  columns: DnColumnDto[] = [];
  shipping_methods_list_title_text: string;
  @Input() isInPopup:boolean;
  close= output()

  private destroy$ = new Subject<void>();

  constructor(
    private columnsService: ColumnsService,
  ) {
    super();
    this.shipping_methods_list_title_text = 'Shipping Methods List';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
  }

  getData() {
    this.store.dispatch(GetAllShippingMethods.action());
    this.dataSource = this.store.select(selectAllShippingMethods);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.ShippingMethodsList);
  }

  onInsertClicked(e: any) {
    this.shippingMethodsGrid.add(e);
  }

  onSaving(data: ShippingMethodDto) {
    let dto: ShippingMethodDto = { ...data };

    if (!dto.Id) {
      this.store.dispatch(InsertShippingMethod.action({ dto }));
    } else {
      this.store.dispatch(UpdateShippingMethod.action({ dto }));
    }
  }

  onDelete(data: ShippingMethodDto) {
    this.store.dispatch(DeleteShippingMethod.action({ id: data.Id }));
  }

  onStopEditing(e: any) {
    this.getData();
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onClose(){
    if(this.isInPopup){
      this.close.emit()
    }
  }
  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertShippingMethod.actionSuccess,
        insertFailure: InsertShippingMethod.actionFailure,
        updateSuccess: UpdateShippingMethod.actionSuccess,
        updateFailure: UpdateShippingMethod.actionFailure,
        deleteSuccess: DeleteShippingMethod.actionSuccess,
        deleteFailure: DeleteShippingMethod.actionFailure,
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

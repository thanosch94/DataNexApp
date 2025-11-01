import { Component, Input, OnDestroy, OnInit, output, ViewChild } from '@angular/core';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { BaseComponent } from '../../components/base/base.component';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import { PaymentMethodDto } from '../../../dto/payment-method.dto';
import { DeletePaymentMethod, GetAllPaymentMethods, InsertPaymentMethod, UpdatePaymentMethod } from '../../../state/parameters/payment-methods/payment-methods.actions';
import { selectAllPaymentMethods } from '../../../state/parameters/payment-methods/payment-methods.selectors';

@Component({
  selector: 'payment-methods-list',
  imports: [DnGridComponent, DnToolbarComponent, AsyncPipe],
  templateUrl: './payment-methods-list.component.html',
  styleUrls: ['./payment-methods-list.component.css']
})
export class PaymentMethodsListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('paymentMethodsGrid')
  paymentMethodsGrid: DnGridComponent;
  dataSource: Observable<PaymentMethodDto[]>;
  columns: DnColumnDto[] = [];
  payment_methods_list_title_text: string;
  @Input() isInPopup:boolean;

  close= output()

  private destroy$ = new Subject<void>();

  constructor(
    private columnsService: ColumnsService,
  ) {
    super();
    this.payment_methods_list_title_text = 'Payment Methods List';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
  }

  getData() {
    this.store.dispatch(GetAllPaymentMethods.action());
    this.dataSource = this.store.select(selectAllPaymentMethods);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.PaymentMethodsList);
  }

  onInsertClicked(e: any) {
    this.paymentMethodsGrid.add(e);
  }

  onSaving(data: PaymentMethodDto) {
    let dto: PaymentMethodDto = { ...data };

    if (!dto.Id) {
      this.store.dispatch(InsertPaymentMethod.action({ dto }));
    } else {
      this.store.dispatch(UpdatePaymentMethod.action({ dto }));
    }
  }

  onDelete(data: PaymentMethodDto) {
    this.store.dispatch(DeletePaymentMethod.action({ id: data.Id }));
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
        insertSuccess: InsertPaymentMethod.actionSuccess,
        insertFailure: InsertPaymentMethod.actionFailure,
        updateSuccess: UpdatePaymentMethod.actionSuccess,
        updateFailure: UpdatePaymentMethod.actionFailure,
        deleteSuccess: DeletePaymentMethod.actionSuccess,
        deleteFailure: DeletePaymentMethod.actionFailure,
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

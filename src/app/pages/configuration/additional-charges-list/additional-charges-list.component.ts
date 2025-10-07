import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AdditionalChargeDto } from '../../../dto/additional-charge.dto';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { BaseComponent } from '../../components/base/base.component';
import {
  DeleteAdditionalChargeById,
  DeleteAdditionalChargeByIdFailure,
  DeleteAdditionalChargeByIdSuccess,
  GetAllAdditionalCharges,
  InsertAdditionalChargeDto,
  InsertAdditionalChargeDtoFailure,
  InsertAdditionalChargeDtoSuccess,
  UpdateAdditionalChargeDto,
  UpdateAdditionalChargeDtoFailure,
  UpdateAdditionalChargeDtoSuccess,
} from '../../../state/parameters/additional-charges/additional-charges.actions';
import { selectAllAdditionalCharges } from '../../../state/parameters/additional-charges/additional-charges.selectors';
import { Observable, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import { DnColumnDto } from '../../../dto/dn-column.dto';

@Component({
  selector: 'app-additional-charges',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './additional-charges-list.component.html',
  styleUrl: './additional-charges-list.component.css',
})
export class AdditionalChargesListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('additionalChargesGrid') additionalChargesGrid: DnGridComponent;

  additionl_charges_text: string;
  dataSource: Observable<AdditionalChargeDto[]>;
  columns: DnColumnDto[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private columnsService: ColumnsService
  ) {
    super();
    this.additionl_charges_text = 'Additional Charges List';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
  }

  getData() {
    this.store.dispatch(GetAllAdditionalCharges());
    this.dataSource = this.store.select(selectAllAdditionalCharges);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(
      GridColumns.AdditionalCharges
    );
  }

  onCloseBtnClicked(e: any) {}

  onInsertBtnClicked(e: any) {
    this.additionalChargesGrid.add(e);
  }

  onAdditionalChargeRowSaving(data: any) {
    let dto: AdditionalChargeDto = { ...data };

    if (!dto.Id) {
      this.store.dispatch(InsertAdditionalChargeDto({ dto }));
    } else {
      this.store.dispatch(UpdateAdditionalChargeDto({ dto }));
    }
  }

  onAdditionalChargeRowStopEditing(e: any) {
    this.getData();
  }

  onAdditionalChargeRowDelete(data: AdditionalChargeDto) {
    this.store.dispatch(DeleteAdditionalChargeById({ id: data.Id }));
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertAdditionalChargeDtoSuccess,
        insertFailure: InsertAdditionalChargeDtoFailure,
        updateSuccess: UpdateAdditionalChargeDtoSuccess,
        updateFailure: UpdateAdditionalChargeDtoFailure,
        deleteSuccess: DeleteAdditionalChargeByIdSuccess,
        deleteFailure: DeleteAdditionalChargeByIdFailure,
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

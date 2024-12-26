import { Component, OnInit, ViewChild } from '@angular/core';

import { AdditionalChargeDto } from '../../../dto/additional-charge.dto';
import { AuthService } from '../../../services/auth.service';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { BaseComponent } from '../../components/base/base.component';
import { Store } from '@ngrx/store';
import {
  DeleteAdditionalChargeById,
  DeleteAdditionalChargeByIdFailure,
  DeleteAdditionalChargeByIdSuccess,
  GetAllAdditionalCharges,
  InsertAdditionalChargeDto,
  InsertAdditionalChargeDtoSuccess,
  UpdateAdditionalChargeDto,
  UpdateAdditionalChargeDtoFailure,
  UpdateAdditionalChargeDtoSuccess,
} from '../../../state/parameters/additional-charges/additional-charges.actions';
import { selectAllAdditionalCharges } from '../../../state/parameters/additional-charges/additional-charges.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-additional-charges',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './additional-charges-list.component.html',
  styleUrl: './additional-charges-list.component.css',
})
export class AdditionalChargesListComponent
  extends BaseComponent
  implements OnInit
{
  @ViewChild('additionalChargesGrid') additionalChargesGrid: DnGridComponent;

  additionl_charges_text: any;
  dataSource: Observable<AdditionalChargeDto[]>;
  columns: any[] = [];

  constructor(private store: Store, private actions$: Actions) {
    super();
    this.additionl_charges_text = 'Additional Charges List';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
  }

  setActionsResults() {
    this.setInsertDtoSuccessActionResult();
    this.setUpdateDtoSuccessActionResult();
    this.setUpdateDtoFailureActionResult();
    this.setDeleteByIdSuccessActionResult();
    this.setDeleteByIdFailureActionResult();
  }

  setInsertDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(InsertAdditionalChargeDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record inserted');
        this.getData();
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(UpdateAdditionalChargeDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record updated');
        this.getData();
      });
  }

  setUpdateDtoFailureActionResult() {
    this.actions$
      .pipe(ofType(UpdateAdditionalChargeDtoFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteAdditionalChargeByIdSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.getData();
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteAdditionalChargeByIdFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  getData() {
    this.store.dispatch(GetAllAdditionalCharges());
    this.dataSource = this.store.select(selectAllAdditionalCharges);
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
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  onCloseBtnClicked(e: any) {}

  onInsertBtnClicked(e: any) {
    this.additionalChargesGrid.add(e);
  }

  onAdditionalChargeRowSaving(data: any) {
    let newAdditionalCharge: AdditionalChargeDto = { ...data };

    if (!newAdditionalCharge.Id) {
      this.store.dispatch(
        InsertAdditionalChargeDto({ dto: newAdditionalCharge })
      );
    } else {
      this.store.dispatch(
        UpdateAdditionalChargeDto({ dto: newAdditionalCharge })
      );
    }
  }

  onAdditionalChargeRowStopEditing(e: any) {
    this.getData();
  }

  onAdditionalChargeRowDelete(data: AdditionalChargeDto) {
    this.store.dispatch(DeleteAdditionalChargeById({ id: data.Id }));
  }
}

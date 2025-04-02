import { TabsService } from './../../../services/tabs.service';
import { Component, Inject, OnInit, Optional, ViewChild, signal } from '@angular/core';
import { StatusDto } from '../../../dto/status.dto';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  DeleteStatusById,
  DeleteStatusByIdFailure,
  DeleteStatusByIdSuccess,
  GetAllStatusesByStatusType,
  InsertStatusDto,
  InsertStatusDtoSuccess,
  UpdateStatusDto,
  UpdateStatusDtoFailure,
  UpdateStatusDtoSuccess,
} from '../../../state/parameters/statuses/statuses.actions';
import { selectAllStatusesByStatusType } from '../../../state/parameters/statuses/statuses.selectors';
import { BaseComponent } from '../../components/base/base.component';
import { Actions, ofType } from '@ngrx/effects';
import { AppTabDto } from '../../../dto/app-tab.dto';

@Component({
  selector: 'app-statuses-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './statuses-list.component.html',
  styleUrl: './statuses-list.component.css',
  providers:[]
})
export class StatusesListComponent extends BaseComponent implements OnInit {
  @ViewChild('statusGrid')
  statusGrid: DnGridComponent;
  columns: any[];
  dataSource: any;
  status: any;
  statuses_list_text: string;
  private statusType: any;
  constructor(
    private store: Store,
    private actions$: Actions,
    @Optional() @Inject('tab') tab:AppTabDto
  ) {
    super();
    this.statuses_list_text = 'Document Statuses List';
    this.statusType = tab.Params["StatusType"]!
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
      .pipe(ofType(InsertStatusDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record inserted');
        this.getData();
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(UpdateStatusDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record updated');
        this.getData();
      });
  }

  setUpdateDtoFailureActionResult() {
    this.actions$
      .pipe(ofType(UpdateStatusDtoFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteStatusByIdSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.getData();
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteStatusByIdFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  getData() {
    this.store.dispatch(
      GetAllStatusesByStatusType({ statusType: this.statusType })
    );
    this.dataSource = this.store.select(
      selectAllStatusesByStatusType(this.statusType)
    );

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

  onRowSaving(data: any) {
    let status: StatusDto = { ...data };
    status.StatusType=this.statusType
    if (!status.Id) {
      this.store.dispatch(InsertStatusDto({ dto: status }));
    } else {
      this.store.dispatch(UpdateStatusDto({ dto: status }));
    }
  }

  onInsertClicked(e: any) {
    this.statusGrid.add(e);
  }

  onRowDelete(data: any) {
    this.store.dispatch(DeleteStatusById({ id: data.Id }));
  }

  onRowStopEditing(e: any) {
    this.getData();
  }

  onRefreshBtnClicked(e: any) {
    this.getData();
  }
}

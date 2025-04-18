import { AsyncPipe } from '@angular/common';
import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { Observable } from 'rxjs';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '../../components/base/base.component';
import { WorkItemTypeDto } from '../../../dto/work-item-type.dto';
import {
  DeleteWorkItemTypeById,
  DeleteWorkItemTypeByIdFailure,
  DeleteWorkItemTypeByIdSuccess,
  GetAllWorkItemTypesByWorkItemCategory as GetAllWorkItemTypesByWorkItemCategory,
  InsertWorkItemTypeDto,
  InsertWorkItemTypeDtoSuccess,
  UpdateWorkItemTypeDto,
  UpdateWorkItemTypeDtoFailure,
  UpdateWorkItemTypeDtoSuccess,
} from '../../../state/parameters/work-item-types/work-item-types.actions';
import { selectAllWorkItemTypes } from '../../../state/parameters/work-item-types/work-item-types.selectors';
import { AppTabDto } from '../../../dto/app-tab.dto';

@Component({
  selector: 'app-work-item-types-list',
  imports: [DnGridComponent, DnToolbarComponent, AsyncPipe],
  templateUrl: './work-item-types-list.component.html',
  styleUrl: './work-item-types-list.component.css',
})
export class WorkItemTypesListComponent extends BaseComponent {
  @ViewChild('workItemTypesGrid')
  workItemTypesGrid: DnGridComponent;
  dataSource: Observable<WorkItemTypeDto[]>;
  document_types_list_title_text: string;
  columns: DnColumnDto[] = [];
  work_item_types_list_title_text: string;
  workItemCategory: any;

  constructor(
    private store: Store,
    private actions$: Actions,
    @Optional() @Inject('tab') tab: AppTabDto
  ) {
    super();
    this.work_item_types_list_title_text = 'Work Item Types List';
    this.workItemCategory = tab.Params['WorkItemCategory']!;
    debugger;
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
      .pipe(ofType(InsertWorkItemTypeDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record inserted');
        this.getData();
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(UpdateWorkItemTypeDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record updated');
        this.getData();
      });
  }

  setUpdateDtoFailureActionResult() {
    this.actions$
      .pipe(ofType(UpdateWorkItemTypeDtoFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteWorkItemTypeByIdSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.getData();
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteWorkItemTypeByIdFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  getData() {
    this.store.dispatch(
      GetAllWorkItemTypesByWorkItemCategory({
        workItemCategory: this.workItemCategory,
      })
    );
    this.dataSource = this.store.select(selectAllWorkItemTypes);
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
        DataField: 'Icon',
        DataType: 'string',
        Caption: 'Icon',
      },
      {
        DataField: 'IconColor',
        DataType: 'string',
        Caption: 'Icon Color',
      },
      {
        DataField: 'IsDefault',
        DataType: 'boolean',
        Caption: 'Is Default',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  onInsertClicked(e: any) {
    this.workItemTypesGrid.add(e);
  }

  onWorkItemTypeSaving(data: WorkItemTypeDto) {
    let workItemType: WorkItemTypeDto = { ...data };
    workItemType.Category = this.workItemCategory;
    if (!workItemType.Id) {
      this.store.dispatch(InsertWorkItemTypeDto({ dto: workItemType }));
    } else {
      this.store.dispatch(UpdateWorkItemTypeDto({ dto: workItemType }));
    }
  }

  onWorkItemTypeDelete(data: WorkItemTypeDto) {
    this.store.dispatch(DeleteWorkItemTypeById({ id: data.Id }));
  }

  onWorkItemTypeStopEditing(e: any) {
    this.getData();
  }

  onRefreshClicked(e: any) {
    this.getData();
  }
}

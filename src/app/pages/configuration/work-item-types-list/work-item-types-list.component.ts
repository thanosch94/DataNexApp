import { AsyncPipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { Observable, Subject } from 'rxjs';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { BaseComponent } from '../../components/base/base.component';
import { WorkItemTypeDto } from '../../../dto/work-item-type.dto';
import {
  DeleteWorkItemTypeById,
  DeleteWorkItemTypeByIdFailure,
  DeleteWorkItemTypeByIdSuccess,
  GetAllWorkItemTypesByWorkItemCategory as GetAllWorkItemTypesByWorkItemCategory,
  InsertWorkItemTypeDto,
  InsertWorkItemTypeDtoFailure,
  InsertWorkItemTypeDtoSuccess,
  UpdateWorkItemTypeDto,
  UpdateWorkItemTypeDtoFailure,
  UpdateWorkItemTypeDtoSuccess,
} from '../../../state/parameters/work-item-types/work-item-types.actions';
import { selectAllWorkItemTypes } from '../../../state/parameters/work-item-types/work-item-types.selectors';
import { AppTabDto } from '../../../dto/app-tab.dto';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';

@Component({
  selector: 'app-work-item-types-list',
  imports: [DnGridComponent, DnToolbarComponent, AsyncPipe],
  templateUrl: './work-item-types-list.component.html',
  styleUrl: './work-item-types-list.component.css',
})
export class WorkItemTypesListComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('workItemTypesGrid')
  workItemTypesGrid: DnGridComponent;
  dataSource: Observable<WorkItemTypeDto[]>;
  document_types_list_title_text: string;
  columns: DnColumnDto[] = [];
  work_item_types_list_title_text: string;
  workItemCategory: any;
  private destroy$ = new Subject<void>();

  constructor(
    private columnsService: ColumnsService,
    @Optional() @Inject('tab') tab: AppTabDto
  ) {
    super();
    this.work_item_types_list_title_text = 'Work Item Types List';
    this.workItemCategory = tab.Params['WorkItemCategory']!;
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
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
    this.columns = this.columnsService.getColumns(GridColumns.WorkItemTypes);
  }

  onInsertClicked(e: any) {
    this.workItemTypesGrid.add(e);
  }

  onWorkItemTypeSaving(data: WorkItemTypeDto) {
    let dto: WorkItemTypeDto = { ...data };
    dto.Category = this.workItemCategory;
    if (!dto.Id) {
      this.store.dispatch(InsertWorkItemTypeDto({ dto }));
    } else {
      this.store.dispatch(UpdateWorkItemTypeDto({ dto }));
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

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertWorkItemTypeDtoSuccess,
        insertFailure: InsertWorkItemTypeDtoFailure,
        updateSuccess: UpdateWorkItemTypeDtoSuccess,
        updateFailure: UpdateWorkItemTypeDtoFailure,
        deleteSuccess: DeleteWorkItemTypeByIdSuccess,
        deleteFailure: DeleteWorkItemTypeByIdFailure,
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

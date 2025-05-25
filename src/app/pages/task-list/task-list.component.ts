import { BaseComponent } from './../components/base/base.component';
import { TaskEditComponent } from './../task-edit/task-edit.component';
import { DnPopupComponent } from './../components/dn-popup/dn-popup.component';
import { Observable, Subject } from 'rxjs';
import { Component, HostListener, OnDestroy, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { Store } from '@ngrx/store';
import { selectAllStatusesByStatusType } from '../../state/parameters/statuses/statuses.selectors';
import { StatusTypeEnum } from '../../enums/status-type.enum';
import { GetAllStatusesByStatusType } from '../../state/parameters/statuses/statuses.actions';
import { StatusDto } from '../../dto/status.dto';
import { WorkItemDto } from '../../dto/work-item.dto';
import { selectAllTaskByUserId } from '../../state/work-items/work-items.selectors';
import { AuthService } from '../../services/auth.service';
import {
  DeleteWorkItemById,
  DeleteWorkItemByIdFailure,
  DeleteWorkItemByIdSuccess,
  GetAllWorkItemsByWorkItemCategory,
} from '../../state/work-items/work-items.actions';
import { WorkItemCategoryEnum } from '../../enums/work-item-category.enum';
import { GetAllWorkItemTypesByWorkItemCategory } from '../../state/parameters/work-item-types/work-item-types.actions';
import { selectAllWorkItemTypesByWorkItemCategory } from '../../state/parameters/work-item-types/work-item-types.selectors';
import { WorkItemTypeDto } from '../../dto/work-item-type.dto';
import { Guid } from 'guid-typescript';
import { StateHelperService } from '../../services/state-helper.service';
import { DevToolsAdd } from '../../decorators/dev-tools-add';
import { taskListComponentId, TaskListPermissionsList } from './task-list-permissions';

@Component({
  selector: 'app-task-list',
  imports: [
    DnToolbarComponent,
    DnGridComponent,
    DnPopupComponent,
    TaskEditComponent,
    AsyncPipe,
    CommonModule,
],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('tasksGrid') tasksGrid: DnGridComponent;
  @ViewChildren('nested') nested!: QueryList<BaseComponent>;

  columns: DnColumnDto[];
  @DevToolsAdd() statusesDataSource: StatusDto[];
  @DevToolsAdd() taskTypesDataSource: WorkItemTypeDto[];
  @DevToolsAdd() dataSource: Observable<WorkItemDto[]>;
  @DevToolsAdd() isPopupVisible: boolean = false;
  @DevToolsAdd() taskId = signal<Guid | null>(null);
  destroy$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private stateHelperService: StateHelperService
  ) {
    super();
     taskListComponentId
  }

  ngOnInit(): void {
    this.getComponentPermissions(structuredClone(TaskListPermissionsList), taskListComponentId); //Deep clone array of objects
    this.setActionsResults();
    this.getLookups();
    this.getData();
  }

  setActionsResults() {
    this.setDeleteByIdSuccessActionResult();
    this.setDeleteByIdFailureActionResult();
  }

  setDeleteByIdSuccessActionResult() {
    this.stateHelperService
      .setActionResult(DeleteWorkItemByIdSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');

        this.getData();
      });
  }

  setDeleteByIdFailureActionResult() {
    this.stateHelperService
      .setActionResult(DeleteWorkItemByIdFailure, this.destroy$)
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  getLookups() {
    this.store.dispatch(
      GetAllStatusesByStatusType({ statusType: StatusTypeEnum.Task })
    ); //Get Statuses
    this.store.dispatch(
      GetAllWorkItemTypesByWorkItemCategory({
        workItemCategory: WorkItemCategoryEnum.Task,
      })
    ); //Get Task Types

    this.store
      .select(selectAllStatusesByStatusType(StatusTypeEnum.Task))
      .subscribe((result) => {
        this.statusesDataSource = result;
        this.store
          .select(
            selectAllWorkItemTypesByWorkItemCategory(WorkItemCategoryEnum.Task)
          )
          .subscribe((result) => {
            this.taskTypesDataSource = result;
            this.getColumns();
          });
      });
  }

  getData() {
    this.store.dispatch(
      GetAllWorkItemsByWorkItemCategory({
        workItemCategory: WorkItemCategoryEnum.Task,
      })
    ); //Get Statuses
    this.dataSource = this.store.select(
      selectAllTaskByUserId(this.auth.user.Id)
    );
  }

  tasks_list_text: string;

  getColumns() {
    this.columns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'SerialNumber',
        DataType: 'number',
        Caption: 'S/N',
        ReadOnly: true,
        Width: 70,
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Title',
      },
      {
        DataField: 'Description',
        DataType: 'string',
        Caption: 'Description',
      },
      {
        DataField: 'StatusId',
        DataType: 'string',
        Caption: 'Status',
        Lookup: {
          DataSource: this.statusesDataSource,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'WorkItemTypeId',
        DataType: 'string',
        Caption: 'Type',
        Lookup: {
          DataSource: this.taskTypesDataSource,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];

    //this.columns =this.columns.map((x)=>Object.assign(new DnColumnDto(), x))
  }
  onInsertClicked(e: any) {
    this.isPopupVisible = true;
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  editTask(e: any) {
    this.taskId.set(e.Id);
    this.isPopupVisible = true;
  }
  deleteTask(e: any) {
    this.store.dispatch(DeleteWorkItemById({ id: e.Id }));
    this.getData();
  }

  onTaskPopupClose() {
    this.isPopupVisible = false;
    this.taskId.set(null);
  }

  onHiding() {
    this.isPopupVisible = false;
    this.taskId.set(null);
  }

  onTaskPopupDelete(id: Guid) {
    this.getData();
    this.isPopupVisible = false;
  }

  onTaskIdFromChildChange(id: Guid) {
    this.taskId.set(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}

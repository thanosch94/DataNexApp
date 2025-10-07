import { BaseComponent } from './../components/base/base.component';
import { TaskEditComponent } from './../task-edit/task-edit.component';
import { DnPopupComponent } from './../components/dn-popup/dn-popup.component';
import { Observable, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DnColumnDto } from '../../dto/dn-column.dto';
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
import { Guid } from 'guid-typescript';
import { StateHelperService } from '../../services/state-helper.service';
import { DevToolsAdd } from '../../decorators/dev-tools-add';
import { taskListComponentId, TaskListPermissionsList } from './task-list-permissions';
import { ColumnsService } from '../../services/columns.service';
import { GridColumns } from '../../base/grid-columns';
import { TabsService } from '../../services/tabs.service';

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
  @DevToolsAdd() dataSource: Observable<WorkItemDto[]>;
  @DevToolsAdd() isPopupVisible: boolean = false;
  @DevToolsAdd() taskId = signal<Guid | null>(null);
  tasks_list_text: string = "Tasks List";
  destroy$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private columnsService: ColumnsService,
  ) {
    super();
     taskListComponentId
     this.tabsService.setActiveTabName(this.tasks_list_text);

  }

  ngOnInit(): void {
    this.getComponentPermissions(structuredClone(TaskListPermissionsList), taskListComponentId); //Deep clone array of objects
    this.setActionsResults();
    this.getColumns();
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

  getData() {
    this.store.dispatch(
      GetAllWorkItemsByWorkItemCategory({
        workItemCategory: WorkItemCategoryEnum.Task,
      })
    );
    this.dataSource = this.store.select(
      selectAllTaskByUserId(this.auth.user.Id)
    );
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.TasksList)
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

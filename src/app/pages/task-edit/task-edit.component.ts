import { firstValueFrom, Observable, Subject } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { WorkItemDto } from '../../dto/work-item.dto';
import { Guid } from 'guid-typescript';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DnTextboxComponent } from '../components/dn-textbox/dn-textbox.component';
import { DnSelectboxComponent } from '../components/dn-selectbox/dn-selectbox.component';
import { UserDto } from '../../dto/user.dto';
import { StatusDto } from '../../dto/status.dto';
import { Store } from '@ngrx/store';
import {
  selectAllStatusesByStatusType,
  selectDefaultTaskStatus,
} from '../../state/parameters/statuses/statuses.selectors';
import { StatusTypeEnum } from '../../enums/status-type.enum';
import { AsyncPipe } from '@angular/common';
import { DnRichTextEditorComponent } from '../components/dn-rich-text-editor/dn-rich-text-editor.component';
import { WorkItemTypeDto } from '../../dto/work-item-type.dto';
import {
  selectAllWorkItemTypesByWorkItemCategory,
  selectDefaultTaskType,
} from '../../state/parameters/work-item-types/work-item-types.selectors';
import { WorkItemCategoryEnum } from '../../enums/work-item-category.enum';
import {
  GetAllWorkItemTypes,
  GetAllWorkItemTypesByWorkItemCategory,
  GetAllWorkItemTypesByWorkItemCategorySuccess,
} from '../../state/parameters/work-item-types/work-item-types.actions';
import { selectAllUsers } from '../../state/users/users.selectors';
import {
  DeleteWorkItemById,
  DeleteWorkItemByIdFailure,
  DeleteWorkItemByIdSuccess,
  GetWorkItemById,
  GetWorkItemByIdSuccess,
  InsertWorkItemDto,
  InsertWorkItemDtoSuccess,
  UpdateWorkItemDto,
  UpdateWorkItemDtoFailure,
  UpdateWorkItemDtoSuccess,
} from '../../state/work-items/work-items.actions';
import { selectTaskById } from '../../state/work-items/work-items.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { GenericFormComponent } from '../components/generic-form/generic-form.component';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';
import { DnDateBoxComponent } from '../components/dn-date-box/dn-date-box.component';
import { WorkItemPriorityEnumlist } from '../../enumLists/work-item-priority.enumlist';
import { AuthService } from '../../services/auth.service';
import { StateHelperService } from '../../services/state-helper.service';
import { WorkItemPriority } from '../../enums/work-item-priority.enum';
import { DevToolsAdd } from '../../decorators/dev-tools-add';
import { taskEditComponentId, TaskEditPermissionsList } from './task-edit-permissions';

@Component({
  selector: 'app-task-edit',
  imports: [
    DnToolbarComponent,
    ReactiveFormsModule,
    DnTextboxComponent,
    DnSelectboxComponent,
    AsyncPipe,
    DnRichTextEditorComponent,
    DnDateBoxComponent,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskEditComponent
  extends GenericFormComponent
  implements OnInit, OnDestroy
{
  taskId = input<Guid | null>();
  taskIdChange = output<Guid>();
  new_task_title_text: string;
  form: FormGroup;
  @DevToolsAdd() task = signal<WorkItemDto>(new WorkItemDto());
  users: Observable<UserDto[]>;
  projectsDatasourse: Observable<any[]>;
  taskStatuses: Observable<StatusDto[]>;
  taskTypes: Observable<WorkItemTypeDto[]>;
  onClose = output();
  idChange = output<Guid>();
  onItemDelete = output<Guid>();
  private destroy$ = new Subject<void>();
  workItemPrioritiesDatasourse: {
    Id: WorkItemPriority;
    Name: string;
  }[];
  perm_CanDelete: boolean;
  perm_CanSave: boolean;
  perm_EnableTaskTypeId: boolean;
  perm_EnableStatusId: boolean;
  perm_EnableProjectId: boolean;
  perm_EnableAssigneeId: boolean;
  perm_EnableWorkItemPriority: boolean;
  perm_EnableDueDate: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private stateHelperService: StateHelperService,
  ) {
    super();
    effect(() => {
      if (this.taskId()) {
        this.getData();
      }
    });
  }

  ngOnInit(): void {
    this.getComponentPermissions(structuredClone(TaskEditPermissionsList), taskEditComponentId);
    this.getUserPermission()
    this.setActionsResults();
    this.initializeForm();
    this.getLookups();
    this.getData();
  }

  async setActionsResults() {
    this.setInsertDtoSuccessActionResult();
    this.setUpdateDtoSuccessActionResult();
    this.setUpdateDtoFailureActionResult();
    this.setDeleteByIdSuccessActionResult();
    this.setDeleteByIdFailureActionResult();
    await this.setGetAllWorkItemTypesByWorkItemCategorySuccessActionResult();
    this.setGetWorkItemByIdSuccessActionResult();
  }

  setInsertDtoSuccessActionResult() {
    this.stateHelperService
      .setActionResult(InsertWorkItemDtoSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.task.set(result.dto);
        //this.displayNotification('Record inserted'); It is on the parent component
        this.taskIdChange.emit(result.dto.Id);
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.stateHelperService
      .setActionResult(UpdateWorkItemDtoSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.displayNotification('Record updated');
        this.getData();
      });
  }

  setUpdateDtoFailureActionResult() {
    this.stateHelperService
      .setActionResult(UpdateWorkItemDtoFailure, this.destroy$)
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.stateHelperService
      .setActionResult(DeleteWorkItemByIdSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.getData();
      });
  }

  setDeleteByIdFailureActionResult() {
    this.stateHelperService
      .setActionResult(DeleteWorkItemByIdFailure, this.destroy$)
      .subscribe((result: any) => {
        this.getData();
      });
  }

  setGetWorkItemByIdSuccessActionResult() {
    this.stateHelperService
      .setActionResult(GetWorkItemByIdSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.store
          .select(selectTaskById(this.taskId()!))
          .subscribe((result: any) => {
            this.task.set(result);
            setTimeout(() => {
              debugger;
              this.form.patchValue(this.task());
            }, 10);
          });
      });
  }

  async getUserPermission(){
    this.perm_CanDelete = await this.hasPermission('CanDelete_Toolbar')??true
    this.perm_CanSave = await this.hasPermission('CanSave_Toolbar')??true
    this.perm_EnableTaskTypeId = await this.hasPermission('EnableTaskTypeId_Field')??true
    this.perm_EnableStatusId = await this.hasPermission('EnableStatusId_Field')??true
    this.perm_EnableProjectId = await this.hasPermission('EnableProjectId_Field')??true
    this.perm_EnableAssigneeId = await this.hasPermission('EnableAssigneeId_Field')??true
    this.perm_EnableWorkItemPriority = await this.hasPermission('EnableWorkItemPriority_Field')??true
    this.perm_EnableDueDate = await this.hasPermission('EnableDueDate_Field')??true
  }

  async setGetAllWorkItemTypesByWorkItemCategorySuccessActionResult() {
    this.stateHelperService
      .setActionResult(
        GetAllWorkItemTypesByWorkItemCategorySuccess,
        this.destroy$
      )
      .subscribe(async () => {
        this.taskTypes = this.store.select(
          selectAllWorkItemTypesByWorkItemCategory(WorkItemCategoryEnum.Task)
        );

        if (!this.taskId()) {
          const result = await firstValueFrom(
            this.store.select(selectDefaultTaskType)
          );

          this.task.update((task) => ({
            ...task,
            WorkItemTypeId: result?.Id ?? undefined,
          }));
          this.form.patchValue(this.task());
        }
      });
  }

  initializeForm() {
    this.form = this.fb.group({
      Name: ['', Validators.required], //TODO Add Validator maxlength and messages
      Description: [''],
      MasterTaskId: [null],
      ProjectId: [null],
      WorkItemTypeId: [null],
      AssigneeId: [null],
      StatusId: [null],
      DueDate: [new Date()],
      WorkItemPriority: [3],
    });
  }

  getLookups() {
    this.getTaskTypes();
    this.getUsers();

    this.getTaskStatuses();
    this.getWorkItemPriorities();
  }

  getWorkItemPriorities() {
    this.workItemPrioritiesDatasourse = WorkItemPriorityEnumlist.value;
  }

  async getTaskStatuses() {
    this.taskStatuses = this.store.select(
      selectAllStatusesByStatusType(StatusTypeEnum.Task)
    );
    if (!this.taskId()) {
      const result = await firstValueFrom(
        this.store.select(selectDefaultTaskStatus)
      );

      this.task.update((task) => ({
        ...task,
        StatusId: result?.Id ?? undefined,
      }));
    }
  }

  getTaskTypes() {
    this.store.dispatch(
      GetAllWorkItemTypesByWorkItemCategory({
        workItemCategory: WorkItemCategoryEnum.Task,
      })
    );
  }

  getUsers() {
    this.users = this.store.select(selectAllUsers);

    if (this.taskId()) {
      this.task.update((task) => ({
        ...task,
        AssigneeId: this.auth.user.Id,
      }));

      this.form.patchValue(this.task());
    }
  }

  getData() {
    if (this.taskId()) {
      this.store.dispatch(GetWorkItemById({ id: this.taskId()! }));
    } else {
      this.task.update((task) => ({
        ...task,
        WorkItemCategory: WorkItemCategoryEnum.Task,
      }));

      this.form.patchValue(this.task());
      this.new_task_title_text = 'New Task';
    }
  }

  onCloseClicked(e: any) {
    this.onClose.emit();
  }

  onDeleteClicked(e: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '320px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.store.dispatch(DeleteWorkItemById({ id: this.task().Id }));
        this.onItemDelete.emit(this.task().Id);
      }
    });
  }

  onSaveClicked(e: any) {
    if (this.form.valid) {
      this.task.set({ ...this.task(), ...this.form.value });

      if (this.task().Id != null) {
        this.store.dispatch(UpdateWorkItemDto({ dto: this.task() }));
      } else {
        this.store.dispatch(InsertWorkItemDto({ dto: this.task() }));
      }
    }
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

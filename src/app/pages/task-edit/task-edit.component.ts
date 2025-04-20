import {
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import {
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
import { GetAllStatusesByStatusType } from '../../state/parameters/statuses/statuses.actions';
import { selectAllStatusesByStatusType } from '../../state/parameters/statuses/statuses.selectors';
import { StatusTypeEnum } from '../../enums/status-type.enum';
import { AsyncPipe } from '@angular/common';
import { DnRichTextEditorComponent } from '../components/dn-rich-text-editor/dn-rich-text-editor.component';
import { WorkItemTypeDto } from '../../dto/work-item-type.dto';
import { selectAllWorkItemTypesByWorkItemCategory } from '../../state/parameters/work-item-types/work-item-types.selectors';
import { WorkItemCategoryEnum } from '../../enums/work-item-category.enum';
import { GetAllWorkItemTypesByWorkItemCategory } from '../../state/parameters/work-item-types/work-item-types.actions';
import { GetAllUsers } from '../../state/users/users.actions';
import { selectAllUsers } from '../../state/users/users.selectors';
import {
  DeleteWorkItemById,
  DeleteWorkItemByIdFailure,
  DeleteWorkItemByIdSuccess,
  GetWorkItemById,
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
import { DnDateBoxComponent } from "../components/dn-date-box/dn-date-box.component";
import { WorkItemPriorityEnumlist } from '../../enumLists/work-item-priority.enumlist';

@Component({
  selector: 'app-task-edit',
  imports: [
    DnToolbarComponent,
    ReactiveFormsModule,
    DnTextboxComponent,
    DnSelectboxComponent,
    AsyncPipe,
    DnRichTextEditorComponent,
    DnDateBoxComponent
],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent
  extends GenericFormComponent
  implements OnInit, OnDestroy
{
  taskId = input<Guid | null>();
  taskIdChange = output<Guid>();
  new_task_title_text: string;
  form: FormGroup;
  task = signal<WorkItemDto>(new WorkItemDto());
  users: Observable<UserDto[]>;
  projectsDatasourse: Observable<any[]>;
  taskStatuses: Observable<StatusDto[]>;
  taskTypes: Observable<WorkItemTypeDto[]>;
  onClose = output();
  idChange = output<Guid>();
  onItemDelete = output();
  private destroy$ = new Subject<void>();
  workItemPrioritiesDatasourse: { Id: import("c:/Local Code/DataNexApp/src/app/enums/work-item-priority.enum").WorkItemPriority; Name: string; }[];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private actions$: Actions
  ) {
    super();
    effect(() => {
      if (this.taskId()) {
        this.getData();
      }
    });
  }

  ngOnInit(): void {
    this.setActionsResults();
    this.initializeForm();
    this.getLookups();
    this.getData();
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
      .pipe(ofType(InsertWorkItemDtoSuccess), takeUntil(this.destroy$))
      .subscribe((result: any) => {
        this.task.set(result.dto);
        this.displayNotification('Record inserted');
        //this.getData();
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(UpdateWorkItemDtoSuccess), takeUntil(this.destroy$))
      .subscribe((result: any) => {
        this.displayNotification('Record updated');
        this.getData();
      });
  }

  setUpdateDtoFailureActionResult() {
    this.actions$
      .pipe(ofType(UpdateWorkItemDtoFailure), takeUntil(this.destroy$))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteWorkItemByIdSuccess), takeUntil(this.destroy$))
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.getData();
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteWorkItemByIdFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  initializeForm() {
    this.form = this.fb.group({
      Name: ['', Validators.required],
      Description: [''],
      MasterTaskId: [null],
      ProjectId: [null],
      WorkItemTypeId: [null],
      AssigneeId: [''],
      StatusId: [''],
      DueDate: [new Date()],
      WorkItemPriority: [3],
    });
  }

  getLookups() {
    this.getTaskTypes();
    this.getUsers();

    this.getTaskStatuses();
    this.getWorkItemPriorities()
  }

  getWorkItemPriorities(){
    this.workItemPrioritiesDatasourse = WorkItemPriorityEnumlist.value
  }

  getTaskStatuses() {
    this.store.dispatch(
      GetAllStatusesByStatusType({ statusType: StatusTypeEnum.Task })
    );
    this.taskStatuses = this.store.select(
      selectAllStatusesByStatusType(StatusTypeEnum.Task)
    );
  }

  getTaskTypes() {
    this.store.dispatch(
      GetAllWorkItemTypesByWorkItemCategory({
        workItemCategory: WorkItemCategoryEnum.Task,
      })
    );
    this.taskTypes = this.store.select(
      selectAllWorkItemTypesByWorkItemCategory(WorkItemCategoryEnum.Task)
    );
  }

  getUsers() {
    this.store.dispatch(GetAllUsers());
    this.users = this.store.select(selectAllUsers);
  }

  getData() {
    if (this.taskId()) {
      this.store.dispatch(GetWorkItemById({ id: this.taskId()! }));
      this.store
        .select(selectTaskById(this.taskId()!))
        .subscribe((result: any) => {
          this.task.set(result);
          setTimeout(() => {
            this.form.patchValue(this.task());
          }, 10);
        });
    } else {
      this.task.update((task) => {
        task.WorkItemCategory = WorkItemCategoryEnum.Task;
        return { ...task };
      });
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
        this.onItemDelete.emit();
      }
    });
  }

  onSaveClicked(e: any) {
    this.task.set({ ...this.task(), ...this.form.value });

    if (this.task().Id != null) {
      this.store.dispatch(UpdateWorkItemDto({ dto: this.task() }));
    } else {
      this.store.dispatch(InsertWorkItemDto({ dto: this.task() }));
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

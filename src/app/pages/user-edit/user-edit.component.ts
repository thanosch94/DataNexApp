import { WorkItemsService } from './../../services/work-items.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  ViewContainerRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { Router } from '@angular/router';
import { WebAppBase } from '../../base/web-app-base';
import { TabsService } from '../../services/tabs.service';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';
import { UserDto } from '../../dto/user.dto';
import { UsersViewModel } from '../../view-models/users.viewmodel';
import { AuthService } from '../../services/auth.service';
import { DnTextboxComponent } from '../components/dn-textbox/dn-textbox.component';
import {
  faAdd,
  faCamera,
  faCircleXmark,
  faEdit,
  faTrash,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DnDateBoxComponent } from '../components/dn-date-box/dn-date-box.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { DnSelectboxComponent } from '../components/dn-selectbox/dn-selectbox.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LookupDto } from '../../dto/lookup.dto';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { GenericFormComponent } from '../components/generic-form/generic-form.component';
import { DnKanbanComponent } from '../components/dn-kanban/dn-kanban.component';
import { MatListModule } from '@angular/material/list';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { Guid } from 'guid-typescript';
import { Store } from '@ngrx/store';
import { GetAllStatusesByStatusType } from '../../state/parameters/statuses/statuses.actions';
import { StatusTypeEnum } from '../../enums/status-type.enum';
import { selectAllStatusesByStatusType } from '../../state/parameters/statuses/statuses.selectors';
import { DnPopupComponent } from '../components/dn-popup/dn-popup.component';
import {
  ClearSelectedWorkItem,
  DeleteWorkItemById,
  DeleteWorkItemByIdFailure,
  DeleteWorkItemByIdSuccess,
  UpdateWorkItemDto,
} from '../../state/work-items/work-items.actions';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-user-edit',
  //#region Imports
  imports: [
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSortModule,
    MatSnackBarModule,
    CommonModule,
    MatDialogModule,
    DnToolbarComponent,
    DnTextboxComponent,
    FaIconComponent,
    MatTooltipModule,
    DnDateBoxComponent,
    MatButtonModule,
    DnSelectboxComponent,
    MatTabsModule,
    ReactiveFormsModule,
    DnKanbanComponent,
    MatListModule,
    DnPopupComponent,
    TaskEditComponent,
  ],
  //#endregion
  providers: [
    TabsService,
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent
  extends GenericFormComponent
  implements OnInit, OnDestroy
{
  form: FormGroup;
  user_text: string;
  usersViewModel: UsersViewModel;
  user: UserDto;
  userId: any;
  appRoles: LookupDto[];

  faCamera = faCamera;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faTriangleExclamation = faTriangleExclamation;
  faCircleXmark = faCircleXmark;
  faAdd = faAdd;
  faEdit = faEdit;
  faTrash = faTrash;
  displayPasswordSetReminder: boolean;
  newPassword: any;
  isComponentReady: boolean;
  columns: any[];
  items = signal<any[]>([]);
  isPopupVisible: boolean;
  taskId = signal<Guid | null>(null);
  private destroy$ = new Subject<void>();

  //#region Constructor
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private tabsService: TabsService,
    private viewContainerRef: ViewContainerRef,
    private fb: FormBuilder,
    private store: Store,
    private workItemsService: WorkItemsService,
    private actions$: Actions
  ) {
    super();

    this.usersViewModel = new UsersViewModel(this.http, this.auth);

    this.appRoles = WebAppBase.AppRoles;

    this.getKanbanData();
  }
  //#endregion

  ngOnInit() {
    this.initializeForm();
    this.setUser();

    this.getData();
    setTimeout(() => {
      this.isComponentReady = true;
      //Used because the password error message is displayed once we navigate to the component and instantly disappears
    }, 1000);
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteWorkItemByIdSuccess), takeUntil(this.destroy$))
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.getKanbanData();
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteWorkItemByIdFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getKanbanData();
      });
  }

  getKanbanData() {
    this.store.dispatch(
      GetAllStatusesByStatusType({ statusType: StatusTypeEnum.Task })
    );

    this.store
      .select(selectAllStatusesByStatusType(StatusTypeEnum.Task))
      .subscribe((result: any) => {
        this.columns = result;

        // this.store.dispatch(
        //   GetAllWorkItemsByWorkItemCategory({
        //     workItemCategory: WorkItemCategoryEnum.Task,
        //   })
        // );
        this.workItemsService
          .GetallByUserId(this.auth.user.Id)
          .subscribe((result: any) => {
            this.items.set(result);
          });
        // this.store
        //   .select(selectAllTaskByUserId(this.auth.user.Id))
        //   .subscribe((result: any) => {
        //   });
      });
  }

  //#region Initialize Form
  initializeForm() {
    this.form = this.fb.group({
      Name: ['', Validators.required],
      BirthDay: [null],
      Occupation: [''],
      UserName: ['', Validators.required],
      UserRoleId: ['', Validators.required],
      Email: [''],
      Address: [''],
      PostalCode: [''],
      City: [''],
      Country: [''],
      Phone1: [''],
      Phone2: [''],
      FacebookUrl: [''],
      InstagramUrl: [''],
      LinkedInUrl: [''],
      Notes: [''],
    });
  }
  //#endregion

  //#region Get User
  setUser() {
    this.user = new UserDto();
    this.userId = WebAppBase.data;
    WebAppBase.data = undefined;
  }

  getData() {
    if (this.userId) {
      this.usersViewModel.GetById(this.userId).subscribe((result: any) => {
        result as UserDto;
        this.user = result;
        if (!this.user.IsPasswordSet) {
          this.displayPasswordSetReminder = true;
        } else {
          this.displayPasswordSetReminder = false;
        }
        this.form.patchValue(this.user);
        this.user_text = this.user.Name;
        this.tabsService.setTabName(this.user.Name);
      });
    } else {
      this.user_text = 'New user';
      this.tabsService.setTabName(this.user_text);

      this.user = new UserDto();
      this.user.IsActive = true;
    }
  }
  //#endregion

  //#region Save User
  onSaveClicked(e: any) {
    let isActive = this.user.IsActive;
    this.user = this.form.value;
    this.user.Id = this.userId;
    this.user.IsActive = isActive;
    this.user.Password = this.newPassword;
    if (this.form.valid) {
      if (this.user.Id) {
        this.usersViewModel.UpdateDto(this.user).subscribe((result: any) => {
          if (result) {
            this.user_text = this.user.Name;
            this.displayNotification('Record updated');
            if (!this.user.Password && !result.IsPasswordSet) {
              this.displayPasswordSetReminder = true;
            }
          }
        });
      } else {
        this.usersViewModel.InsertDto(this.user).subscribe((result: any) => {
          this.user = result;
          this.user_text = this.user.Name;
          this.displayNotification('Record inserted');
          if (!this.user.Password && !result.IsPasswordSet) {
            this.displayPasswordSetReminder = true;
          }
        });
      }
    } else {
      this.markAllAsTouched(this.form);
    }
  }
  //#endregion

  //#region Delete User
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
        this.deleteItem(event);
      } else {
      }
    });
  }

  onDeleteCancelClicked(e: any) {
    this.dialog.closeAll();
  }

  deleteItem(e: any) {
    this.usersViewModel.DeleteById(this.user.Id).subscribe({
      next: (result) => {
        this.displayNotification('Record deleted');
        this.router.navigate(['users-list']);
      },
      error: (err) => {
        const dialog = this.dialog.open(DnAlertComponent, {
          data: {
            Title: 'Message',
            Message: err.error.innerExceptionMessage,
          },
        });
      },
    });
  }

  //#endregion

  //#region Password Change
  onKeyClicked(e: any) {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      panelClass: 'change-password-container',
      data: {
        Title: 'Message',
        Data: this.user,
      },
      viewContainerRef: this.viewContainerRef,
    });
    dialogRef.afterClosed().subscribe((newPassword) => {
      if (!newPassword && !this.user.IsPasswordSet) {
        this.displayPasswordSetReminder = true;
      } else if (!newPassword && this.user.IsPasswordSet) {
        this.displayPasswordSetReminder = false;
      } else {
        this.newPassword = newPassword;
        this.displayPasswordSetReminder = false;
      }
    });
  }

  onClosePasswordSetReminder(e: any) {
    this.displayPasswordSetReminder = false;
  }
  //#endregion

  //#region Activate/De.. User
  onUserActiveBtnClicked(e: any) {
    if (!this.user.Id) {
      this.user.IsActive = !this.user.IsActive;
    } else {
      let userActivationMessage = this.user.IsActive
        ? 'Are you sure you want to deactivate this user'
        : 'Are you sure you want to activate this user';
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '340px',
        data: {
          Title: 'Message',
          Content: userActivationMessage,
        },
      });
      dialogRef.afterClosed().subscribe((confirm) => {
        if (confirm) {
          //Replace isUserActive with user.IsActive=true or false and update user
          this.user.IsActive = !this.user.IsActive;
        }
      });
    }
  }

  //#endregion

  // displayNotification(text: string) {
  //   this._snackBar.open(text, '', {
  //     duration: 1000,
  //     panelClass: 'green-snackbar',
  //   });
  // }

  onRefreshClicked(e: any) {
    this.getData();
    this.getKanbanData();
  }

  onCloseClicked(e: any) {
    this.router.navigate(['users-list']);
  }

  onBlur(e: any, formControl: string) {
    this.markAsTouched(this.form, formControl);
  }

  onAddBtnClicked(e: any) {
    //this.openTaskEditDialog();
    this.taskId.set(null);
    this.isPopupVisible = true;
  }

  openTaskEditDialog(taskId?: Guid) {
    this.dialog.open(TaskEditComponent, {
      width: '700px',
      height: '500px',
      data: {
        Title: 'New Task',
        TaskId: taskId,
      },
    });
  }
  onHiding() {
    this.taskId.set(null);

    this.isPopupVisible = false;
  }

  onTaskPopupClose() {
    this.isPopupVisible = false;

    this.getKanbanData();
    this.store.dispatch(ClearSelectedWorkItem());
  }

  onTaskEditBtnClicked(item: any) {
    this.taskId.set(item.Id);
    this.isPopupVisible = true;
  }

  onItemDeleteBtnClicked(item: any) {
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
        this.store.dispatch(DeleteWorkItemById({ id: item.Id }));
        this.getKanbanData();
      }
    });
  }

  onTaskClicked(task: any) {
    this.taskId.set(task.Id);
  }

  onTaskDrop(e: any) {
    this.store.dispatch(UpdateWorkItemDto({ dto: e.newValue }));
  }

  onTaskDelete(e: any) {
    this.isPopupVisible = false;
    this.taskId.set(null);
    this.getKanbanData();
  }

  ngOnDestroy() {
    WebAppBase.data = undefined;
    this.destroy$.next();
    this.destroy$.complete();
  }
}

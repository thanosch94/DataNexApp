import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
import { faCamera, faCircleXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
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

@Component({
  selector: 'app-user-edit',
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
    ReactiveFormsModule
  ],
  providers: [TabsService],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent {
  form:FormGroup
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
  displayPasswordSetReminder: boolean =true;


  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private tabsService: TabsService,
    private viewContainerRef: ViewContainerRef,
    private fb:FormBuilder
  ) {
    this.usersViewModel = new UsersViewModel(this.http, this.auth);

    this.appRoles = WebAppBase.AppRoles;
  }

  ngOnInit() {
    this.initializeForm()
    this.setUser()
    this.getData();
  }

  initializeForm(){
    this.form = this.fb.group({
      name: ['', Validators.required],
      birthday: [''],
      occupation:[''],
      username:['', Validators.required],
      role:['', Validators.required],
      email:[''],
      address:[''],
      postalCode:[''],
      city:[''],
      country:[''],
      phone1:[''],
      phone2:[''],
      facebookUrl:[''],
      instagramUrl:[''],
      linkedInUrl:[''],
      notes:[''],
    })
  }

  setUser(){
    this.user = new UserDto();
    this.userId = WebAppBase.data;
    WebAppBase.data = undefined;
  }
  getData() {
    if (this.userId) {
      this.usersViewModel.GetById(this.userId).subscribe((result: any) => {
        result as UserDto;
        this.user = result;
        this.user_text = this.user.Name;
        this.tabsService.setTabName(this.user.Name);
      });
    } else {
      this.user_text = 'New user';
      this.tabsService.setTabName(this.user_text);

      this.user = new UserDto();
    }
  }
  onCloseClicked(e: any) {
    this.router.navigate(['users-list']);
  }

  onSaveClicked(e: any) {
        if (this.user.Id) {
          this.usersViewModel.UpdateDto(this.user).subscribe((result: any) => {
            if (result) {
              this.user_text = this.user.Name;
              this.displayNotification('Record updated');
            }
          });
        } else {
          this.usersViewModel.InsertDto(this.user).subscribe((result: any) => {
            this.user = result;
            this.user_text = this.user.Name;
            this.displayNotification('Record inserted')

          });
        }
    if (this.user.Password) {
      this.displayPasswordSetReminder = true

    }
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
        this.deleteItem(event);
      } else {
      }
    });
  }
  onRefreshClicked(e: any) {
    this.getData();
  }

  onDeleteCancelClicked(e: any) {
    this.dialog.closeAll();
  }

  deleteItem(e: any) {
    this.usersViewModel.DeleteById(this.user.Id).subscribe({
      next: (result) => {
        this.displayNotification('Record deleted')
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
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
      }
    });
  }

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
  displayNotification(text: string) {
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
  }


  onClosePasswordSetReminder(e:any){
    this.displayPasswordSetReminder = false
  }

  ngOnDestroy() {
    WebAppBase.data = undefined;
  }
}

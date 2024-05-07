import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatSortModule,
    MatSnackBarModule,
    CommonModule,
    MatDialogModule,
    DnToolbarComponent
  ],
  providers: [TabsService],

  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  user_text: string;
  usersViewModel: UsersViewModel;
  user: UserDto
  userId: any;
  confirmPassword: string;
  constructor(
    private http: HttpClient,
    private auth:AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private tabsService: TabsService
  ) {
    this.usersViewModel = new UsersViewModel(this.http, this.auth);
    this.user = new UserDto();
    this.userId = WebAppBase.data;
  }

  ngOnInit() {
    if (this.userId) {
      this.usersViewModel
        .GetById(this.userId)
        .subscribe((result: any) => {
          result as UserDto;
          this.user = result;
          this.user_text = this.user.Name
          this.tabsService.setTabName(this.user.Name);
        });
    } else {
      this.user_text = 'New user';
      this.user = new UserDto();
    }
  }

  onCloseClicked(e: any) {
    this.router.navigate(['users-list']);
  }

  onSaveClicked(e: any) {
    if(this.user.Password){
      if(this.user.Password==this.confirmPassword){
        debugger
        if (this.user.Id) {
          this.usersViewModel
            .UpdateDto(this.user)
            .subscribe((result: any) => {
              if (result) {
                this.user_text = this.user.Name;
                this._snackBar.open('Η εγγραφή ενημερώθηκε', '', {
                  duration: 1000,
                  panelClass: 'green-snackbar',
                });
              }
            });
        } else {
          this.usersViewModel
            .InsertDto(this.user)
            .subscribe((result: any) => {
              this.user = result;
              this.user_text = this.user.Name;
              this._snackBar.open('Η εγγραφή καταχωρήθηκε', '', {
                duration: 1000,
                panelClass: 'green-snackbar',
              });
            });
        }
      }else{
        const dialog = this.dialog.open(DnAlertComponent, {
          data: {
            Title: "Message",
            Message: "Passwords don't match",
          },
        });
      }
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

  onDeleteCancelClicked(e: any) {
    let data = this.dialog.closeAll();
  }

  deleteItem(e: any) {
    this.usersViewModel.DeleteById(this.user.Id).subscribe({
      next: (result) => {
        this._snackBar.open('Record deleted', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
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

  ngOnDestroy() {
    WebAppBase.data = undefined;
  }

  async onVatIdValueChanged(e: any) {
    //IF NEEDED TO CONNEC TO TO AADE TO GET AFM DATA
    // if (e.target.selectionStart == 9) {
    //   this.usersViewModel
    //     .GetFromAade('', '!', e.target.value, '')
    //     .subscribe((result: any) => {});
    // }
  }
}

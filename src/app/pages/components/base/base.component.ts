import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DnAlertComponent } from '../dn-alert/dn-alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-base',
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class BaseComponent {
  protected snackBar: MatSnackBar = inject(MatSnackBar)
  protected dialog: MatDialog = inject(MatDialog)
  displayNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
  }

  displayErrorAlert(error:any){
    let errorMessage
    if(error?.error?.innerExceptionMessage){
      errorMessage = error.error?.innerExceptionMessage
    }else{
      errorMessage =error.message
    }
    const dialog = this.dialog.open(DnAlertComponent, {
      data: {
        Title: 'Message',
        Message: errorMessage,
      },
    });
  }
}

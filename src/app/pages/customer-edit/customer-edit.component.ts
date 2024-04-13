import { DeleteConfirmComponent } from './../components/delete-confirm/delete-confirm.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomersViewModel } from './../../view-models/customers.viewmodel';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CustomerDto } from '../../dto/customer.dto';
import { WebAppBase } from '../../base/web-app-base';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';

@Component({
  selector: 'app-customer-edit',
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
  ],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css',
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  customer_text: string;
  customersViewModel: CustomersViewModel;
  customer: CustomerDto;
  customerId: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.customersViewModel = new CustomersViewModel(this.http);
    this.customer = new CustomerDto();
    this.customerId = WebAppBase.data;
  }

  ngOnInit() {
    if (this.customerId) {
      this.customer_text = 'Customer Edit';

      this.customersViewModel
        .GetById(this.customerId)
        .subscribe((result: any) => {
          result as CustomerDto;
          this.customer = result;
        });
    } else {
      this.customer_text = 'New Customer';
      this.customer = new CustomerDto();
    }
  }

  onCloseClicked(e: any) {
    this.router.navigate(['customers-list']);
  }

  onSaveClicked(e: any) {
    if (this.customer.Id) {
      this.customersViewModel
        .UpdateDto(this.customer)
        .subscribe((result: any) => {
          if (result) {
            this.customer_text = this.customer.Name;
            this._snackBar.open('Η εγγραφή ενημερώθηκε', '', {
              duration: 1000,
              panelClass: 'green-snackbar',
            });
          }
        });
    } else {
        this.customersViewModel
        .InsertDto(this.customer)
        .subscribe((result: any) => {
          this.customer = result;
          this.customer_text = this.customer.Name;
          this._snackBar.open('Η εγγραφή καταχωρήθηκε', '', {
            duration: 1000,
            panelClass: 'green-snackbar',
          });
        });
    }
  }
  onDeleteClicked(e: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
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
    this.customersViewModel
    .DeleteById(this.customer.Id)
    .subscribe({
    next: (result) => {
      this._snackBar.open('Record deleted', '', {
        duration: 1000,
        panelClass: 'green-snackbar',
      });
      this.router.navigate(['customers-list']);

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
    //   this.customersViewModel
    //     .GetFromAade('', '!', e.target.value, '')
    //     .subscribe((result: any) => {});
    // }
  }
}

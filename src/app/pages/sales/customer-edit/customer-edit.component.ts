
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WebAppBase } from '../../../base/web-app-base';
import { CustomerDto } from '../../../dto/customer.dto';
import { AuthService } from '../../../services/auth.service';
import { TabsService } from '../../../services/tabs.service';
import { CustomersViewModel } from '../../../view-models/customers.viewmodel';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnCheckboxComponent } from "../../components/dn-checkbox/dn-checkbox.component";
import { DnTextboxComponent } from "../../components/dn-textbox/dn-textbox.component";
import { DevToolsAdd } from '../../../decorators/dev-tools-add';
import { BaseComponent } from '../../components/base/base.component';


@Component({
    selector: 'app-customer-edit',
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
        DnToolbarComponent,
        DnTextboxComponent
    ],
    providers: [TabsService],
    templateUrl: './customer-edit.component.html',
    styleUrl: './customer-edit.component.css'
})

export class CustomerEditComponent extends BaseComponent implements OnInit, OnDestroy {
  @DevToolsAdd() customer_text: string;
  customersViewModel: CustomersViewModel;
  @DevToolsAdd() customer: CustomerDto;
  @DevToolsAdd() customerId: any;
  previousTabName: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private tabsService: TabsService
  ) {
    super()
    this.customersViewModel = new CustomersViewModel(this.http, this.auth);
    this.customer = new CustomerDto();
    this.customerId = WebAppBase.data;
    WebAppBase.data = undefined;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    if (this.customerId) {
      this.customersViewModel
        .GetById(this.customerId)
        .subscribe((result: any) => {
          result as CustomerDto;
          this.customer = result;
          this.customer_text = this.customer.Name;
          this.tabsService.setTabName(this.customer.Name);
        });
    } else {
      this.customer_text = 'New Customer';
      this.tabsService.setTabName(this.customer_text);

      this.customer = new CustomerDto();
    }
  }

  onCloseClicked(e: any) {
    this.router.navigate(['customers-list']);
    this.tabsService.setActiveTabPreviousName()

  }

  onSaveClicked(e: any) {
    if (this.customer.Id) {
      this.customersViewModel
        .UpdateDto(this.customer)
        .subscribe((result: any) => {
          if (result) {
            this.customer =result;
            this.previousTabName = this.customer_text.toString()
            this.customer_text = this.customer.Name;
            this.tabsService.setTabNameByOldName(this.customer_text, this.previousTabName)

            this._snackBar.open('Record updated', '', {
              duration: 1000,
              panelClass: 'green-snackbar',
            });
          }
        });
    } else {
      this.customersViewModel
        .InsertDto(this.customer)
        .subscribe((result: any) => {
          this.customer =result;
          this.previousTabName = this.customer_text.toString()
          this.customer_text = this.customer.Name;
          this.tabsService.setTabNameByOldName(this.customer_text, this.previousTabName)

          this._snackBar.open('Record inserted', '', {
            duration: 1000,
            panelClass: 'green-snackbar',
          });
        });
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
    this.customersViewModel.DeleteById(this.customer.Id).subscribe({
      next: (result) => {
        this._snackBar.open('Record deleted', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
        this.router.navigate(['customers-list']);
        this.tabsService.setActiveTabPreviousName()

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

  async onVatIdValueChanged(e: any) {
    //IF NEEDED TO CONNECT TO TO AADE TO GET AFM DATA
    // if (e.target.selectionStart == 9) {
    //   this.customersViewModel
    //     .GetFromAade('', '!', e.target.value, '')
    //     .subscribe((result: any) => {});
    // }
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  ngOnDestroy() {
    WebAppBase.data = undefined;
  }
}

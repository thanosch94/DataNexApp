import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WebAppBase } from '../../../base/web-app-base';
import { SupplierDto } from '../../../dto/supplier.dto';
import { AuthService } from '../../../services/auth.service';
import { TabsService } from '../../../services/tabs.service';
import { SuppliersViewModel } from '../../../view-models/suppliers.viewmodel';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BaseComponent } from '../../components/base/base.component';

@Component({
  selector: 'app-supplier-edit',
  imports: [
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSortModule,
    MatSnackBarModule,
    CommonModule,
    DnToolbarComponent,
  ],
  templateUrl: './supplier-edit.component.html',
  styleUrl: './supplier-edit.component.css',
})
export class SupplierEditComponent extends BaseComponent {
  supplier_text: string;
  suppliersViewModel: SuppliersViewModel;
  supplier: SupplierDto;
  supplierId: any;
  previousTabName: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
  ) {
    super()
    this.suppliersViewModel = new SuppliersViewModel(this.http, this.auth);
    this.supplier = new SupplierDto();
    this.supplierId = WebAppBase.data;
    WebAppBase.data = undefined;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    if (this.supplierId) {
      this.suppliersViewModel
        .GetById(this.supplierId)
        .subscribe((result: any) => {
          result as SupplierDto;
          this.supplier = result;
          this.supplier_text = this.supplier.Name;
        });
    } else {
      this.supplier_text = 'New Supplier';
      this.tabsService.setTabName(this.supplier_text);

      this.supplier = new SupplierDto();
    }
  }

  onCloseClicked(e: any) {
    this.router.navigate(['suppliers-list']);
    this.tabsService.setActiveTabPreviousName();
  }

  onSaveClicked(e: any) {
    if (this.supplier.Id) {
      this.suppliersViewModel
        .UpdateDto(this.supplier)
        .subscribe((result: any) => {
          if (result) {
            this.supplier = result;
            this.previousTabName = this.supplier_text.toString();
            this.supplier_text = this.supplier.Name;
            this.tabsService.setActiveTabName(this.supplier_text);
            this.displayNotification('Record updated')
          }
        });
    } else {
      this.suppliersViewModel
        .InsertDto(this.supplier)
        .subscribe((result: any) => {
          this.supplier = result;
          this.previousTabName = this.supplier_text.toString();
          this.supplier_text = this.supplier.Name;
          this.tabsService.setActiveTabName(this.supplier_text);
          this.displayNotification('Record inserted')
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
    this.suppliersViewModel.DeleteById(this.supplier.Id).subscribe({
      next: (result) => {
        this.displayNotification('Record deleted')
        this.router.navigate(['suppliers-list']);
        this.tabsService.setActiveTabPreviousName();
      },
      error: (err) => {
        this.displayErrorAlert(err)
      },
    });
  }

  async onVatIdValueChanged(e: any) {
    //IF NEEDED TO CONNECT TO TO AADE TO GET AFM DATA
    // if (e.target.selectionStart == 9) {
    //   this.suppliersViewModel
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

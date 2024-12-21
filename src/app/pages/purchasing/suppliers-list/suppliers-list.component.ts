import { SuppliersViewModel } from '../../../view-models/suppliers.viewmodel';
import { Component, ViewChild } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { TabsService } from '../../../services/tabs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SupplierDto } from '../../../dto/supplier.dto';
import { Router } from '@angular/router';
import { WebAppBase } from '../../../base/web-app-base';

@Component({
    selector: 'app-suppliers-list',
    imports: [DnToolbarComponent, DnGridComponent],
    templateUrl: './suppliers-list.component.html',
    styleUrl: './suppliers-list.component.css'
})
export class SuppliersComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('suppliersGrid') suppliersGrid: DnGridComponent;
  suppliersViewModel: SuppliersViewModel;
  suppliers_list_title_text: string;
  suppliersDataSource: any;
  suppliersColumns: DnColumnDto[] = [];
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private tabsService: TabsService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.suppliersViewModel = new SuppliersViewModel(this.http, this.auth);

    this.suppliers_list_title_text = 'Suppliers List';
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.suppliersViewModel.GetAll().subscribe((result: any) => {
      this.suppliersDataSource = result;
    });
  }

  getColumns() {
    this.suppliersColumns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Address',
        DataType: 'string',
        Caption: 'Address',
      },

      {
        DataField: 'Region',
        DataType: 'string',
        Caption: 'Region',
      },
      {
        DataField: 'PostalCode',
        DataType: 'string',
        Caption: 'Postal Code',
      },
      {
        DataField: 'City',
        DataType: 'string',
        Caption: 'City',
      },
      {
        DataField: 'Country',
        DataType: 'string',
        Caption: 'Country',
      },
      {
        DataField: 'Phone1',
        DataType: 'number',
        Caption: 'Phone 1',
      },
      {
        DataField: 'Phone2',
        DataType: 'number',
        Caption: 'Phone 2',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  onInsertClicked(e: any) {
    this.router.navigate(['supplier-edit']);
    this.tabsService.setActiveTabName('New Supplier');
  }

  onSupplierDelete(data: SupplierDto) {
    this.suppliersViewModel.DeleteById(data.Id).subscribe({
      next: (result: any) => {
        let index = this.suppliersGrid.matDataSource.data.indexOf(data);
        this.suppliersGrid.matDataSource.data.splice(index, 1);
        this.getData();
        this.suppliersGrid.table.renderRows();
        this.displayNotification('Record deleted');
      },
      error: (err: any) => {
        const dialog = this.dialog.open(DnAlertComponent, {
          data: {
            Title: 'Message',
            Message: err.error,
          },
        });
      },
    });
  }
  onSupplierRowEditing(data: any) {
    WebAppBase.data = data.Id;
    this.router.navigate(['supplier-edit']);
    this.tabsService.setActiveTabName(data.Name);
  }

  displayNotification(text: string) {
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
  }

  onRefreshClicked(e: any) {
    this.getData();
    this.suppliersGrid.renderRows();
  }
}

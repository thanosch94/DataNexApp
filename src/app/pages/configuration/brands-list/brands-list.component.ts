import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortHeader } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrandsViewModel } from '../../../view-models/brands.viewmodel';
import { BrandDto } from '../../../dto/brand.dto';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { NewItemComponent } from '../../components/new-item/new-item.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';

@Component({
    selector: 'app-brands-list',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatPaginator,
        MatPaginatorModule,
        MatSort,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        HttpClientModule,
        MatSortHeader,
        DnToolbarComponent,
        MatTooltipModule,
        DnGridComponent
    ],
    templateUrl: './brands-list.component.html',
    styleUrl: './brands-list.component.css'
})
export class BrandsListComponent implements OnInit {
  @ViewChild('brandsGrid') brandsGrid: DnGridComponent;
  columns:any[]
  dataSource: BrandDto[];
  brandsViewModel: BrandsViewModel;
  brand: BrandDto = new BrandDto();
  product_brands_list_text: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.brandsViewModel = new BrandsViewModel(this.http, this.auth);
    this.product_brands_list_text = 'Product Brands List';
  }
  ngOnInit() {
    this.getData();
    this.getColumns()
  }

  getData() {
    this.brandsViewModel.GetAll().subscribe((result: any) => {
      this.dataSource = result;
    });
  }

  getColumns(){
    this.columns = [
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
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  deleteBrand(data: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '320px',
      maxHeight:'300px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.deleteItem(data);
      } else {
        //No action
      }
    });
  }

  deleteItem(data: any) {
    this.brandsViewModel.DeleteById(data.Id).subscribe({
      next: (result) => {
        this.getData();

        this._snackBar.open('Record deleted', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
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

  onInsertClicked(e: any) {
    this.brandsGrid.add(e)
  }

  onRowSaving(data:any){
    let brand = new BrandDto();

    if (data.Id) {
      brand.Id = data.Id;
    }
    brand.Name = data.Name;

    if (!brand.Id) {
      this.insertItem(brand);
    } else {
      this.updateItem(brand);
    }
  }

  updateItem(data: any) {
    this.brand.Name = data;
    this.brandsViewModel.UpdateDto(this.brand).subscribe((result: any) => {
      this.getData();
      this._snackBar.open('Record updated', '', {
        duration: 1000,
        panelClass: 'green-snackbar',
      });
    });
  }

  insertItem(data: any) {
    let brand = new BrandDto();
    brand.Name = data;
    this.brandsViewModel.InsertDto(brand).subscribe((result: any) => {
      this._snackBar.open('Record inserted', '', {
        duration: 1000,
        panelClass: 'green-snackbar',
      });
      this.getData();
    });
  }

  onRefreshClicked(e: any) {
    this.getData();
  }
}

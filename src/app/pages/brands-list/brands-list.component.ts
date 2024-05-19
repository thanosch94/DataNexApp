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
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { BrandDto } from '../../dto/brand.dto';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandsViewModel } from '../../view-models/brands.viewmodel';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';
import { NewItemComponent } from '../components/new-item/new-item.component';

@Component({
  selector: 'app-brands-list',
  standalone: true,
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
  ],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.css',
})
export class BrandsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('brandsTable') brandsTable: MatTable<BrandDto>;

  displayedColumns: string[] = ['Name', 'buttons'];
  dataSource: MatTableDataSource<BrandDto>;
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
  }

  getData() {
    this.brandsViewModel.GetAll().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProductSize(data: any) {
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

  editProductSize(data: any) {
    this.brand = data;
    const dialogRef = this.dialog.open(NewItemComponent, {
      width: '500px',
      data: {
        title: 'Edit Item',
        name: this.brand.Name,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.updateItem(data);
      } else {
      }
    });
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

  onInsertClicked(e: any) {
    const dialogRef = this.dialog.open(NewItemComponent, {
      width: '500px',
      data: {
        title: 'New Item',
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.insertItem(data);
      } else {
      }
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
    this.brandsTable.renderRows();
  }
}

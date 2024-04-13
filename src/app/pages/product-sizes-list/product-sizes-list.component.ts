import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductSizeDto } from '../../dto/product-size.dto';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentTypesViewModel } from '../../view-models/document-types.viewmodel';
import { ProductSizesViewModel } from '../../view-models/product-sizes.viewmodel';
import { NewItemComponent } from '../components/new-item/new-item.component';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-product-sizes-list',
  standalone: true,
  imports: [MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    HttpClientModule,
    MatSortHeader],
  templateUrl: './product-sizes-list.component.html',
  styleUrl: './product-sizes-list.component.css'
})
export class ProductSizesListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'Name',
    'Abbreviation',
    'buttons',
  ];
  dataSource: MatTableDataSource<ProductSizeDto>;
  productSizesViewModel: ProductSizesViewModel;
  productSize: ProductSizeDto = new ProductSizeDto();

  constructor(private http:HttpClient, public dialog: MatDialog,   private _snackBar: MatSnackBar,

    ){
    this.productSizesViewModel = new ProductSizesViewModel(this.http)
  }
  ngAfterViewInit() {
  this.getData()
  }

  getData(){
    this.productSizesViewModel.GetAll().subscribe((result: any) => {
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
        this.deleteItem(data);
      } else {
      }
    });
  }

  deleteItem(data:any){
    this.productSizesViewModel
    .DeleteById(data.Id)
    .subscribe({
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

  editProductSize(data:any){
    this.productSize=data;
    const dialogRef = this.dialog.open(NewItemComponent, {
      width: '500px',
      data: {
        title: 'Edit Item',
        name:this.productSize.Name
      },
    });
    dialogRef.afterClosed().subscribe((data) => {

      if (data) {
        this.updateItem(data);
      } else {
      }
    });
  }
  updateItem(data:any){
     this.productSize.Name = data
    this.productSizesViewModel.UpdateDto(this.productSize).subscribe((result:any)=>{
      this.getData();
      this._snackBar.open('Record updated', '', {
        duration: 1000,
        panelClass: 'green-snackbar',
      });
    })
  }
  addProductSize(e:any){
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

insertItem(data:any){
  let productSize = new ProductSizeDto()
  productSize.Name = data
  this.productSizesViewModel.InsertDto(productSize).subscribe((result:any)=>{
    this._snackBar.open('Record inserted', '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
    this.getData();

  })
}
}

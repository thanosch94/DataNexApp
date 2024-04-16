import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StatusDto } from '../../dto/status.dto';
import { StatusesViewModel } from '../../view-models/statuses.viewmodel';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewItemComponent } from '../components/new-item/new-item.component';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';

@Component({
  selector: 'app-statuses-list',
  standalone: true,
  imports: [ MatButtonModule,MatIconModule,MatPaginator,MatPaginatorModule,MatSort,MatSortModule, MatInputModule, MatFormFieldModule,MatTableModule,HttpClientModule,MatSortHeader,
  ],  templateUrl: './statuses-list.component.html',
  styleUrl: './statuses-list.component.css'
})
export class StatusesListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['Name', 'buttons'];
  dataSource: MatTableDataSource<StatusDto>;
  status: any;
  statusesViewModel: StatusesViewModel;

constructor(private http:HttpClient, public dialog: MatDialog,   private _snackBar: MatSnackBar,

  ){
  this.statusesViewModel = new StatusesViewModel(this.http)
}

ngAfterViewInit() {
this.getData();
}

getData(){
  this.statusesViewModel.GetAll().subscribe((result:any)=>{
    this.dataSource = new MatTableDataSource(result)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}
  editStatus(data:any){
    this.status=data;
    const dialogRef = this.dialog.open(NewItemComponent, {
      width: '500px',
      data: {
        title: 'Edit Item',
        name:this.status.Name
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
     this.status.Name = data
    this.statusesViewModel.UpdateDto(this.status).subscribe((result:any)=>{
      this.getData();
      this._snackBar.open('Record updated', '', {
        duration: 1000,
        panelClass: 'green-snackbar',
      });
    })
  }
  addStatus(e:any){
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
  let status = new StatusDto()
  status.Name = data
  this.statusesViewModel.InsertDto(status).subscribe((result:any)=>{
    this._snackBar.open('Record inserted', '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
    this.getData();

  })
}
  applyFilter(e:any){
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteStatus(data: any) {
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
      }
    });
  }

  deleteItem(data: any) {
   this.statusesViewModel
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

}

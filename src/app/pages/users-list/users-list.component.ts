import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';
import { NewItemComponent } from '../components/new-item/new-item.component';
import { UsersViewModel } from '../../view-models/users.viewmodel';
import { Router } from '@angular/router';
import { UserDto } from '../../dto/user.dto';
import { WebAppBase } from '../../base/web-app-base';

@Component({
  selector: 'app-users-list',
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
    DnToolbarComponent
  ],  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['Name', 'Email', 'Username', 'UserRole', 'buttons'];
  dataSource: MatTableDataSource<UserDto>;
  users_list_text: string;
  usersViewModel: UsersViewModel;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar:MatSnackBar
  ) {
    this.usersViewModel = new UsersViewModel(this.http);
    this.users_list_text = "Users List"
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.usersViewModel.GetAll().subscribe((result: any) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editUser(data: any) {
    WebAppBase.data = data.Id
    this.router.navigate(['user-edit'])
  }

  onInsertClicked(e:any){
    this.router.navigate(['user-edit'])
  }


  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(data: any) {
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
    this.usersViewModel.DeleteById(data.Id).subscribe({
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

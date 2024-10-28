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
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';
import { UsersViewModel } from '../../view-models/users.viewmodel';
import { Router } from '@angular/router';
import { UserDto } from '../../dto/user.dto';
import { WebAppBase } from '../../base/web-app-base';
import { AuthService } from '../../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { AsyncPipe } from '@angular/common';

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
    DnToolbarComponent,
    MatTooltipModule,
    DnGridComponent,
    AsyncPipe
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {

  @ViewChild('usersGrid') usersGrid: DnGridComponent;

  displayedColumns: string[] = [
    'Name',
    'Email',
    'Username',
    'UserRole',
    'buttons',
  ];
  dataSource: any;
  users_list_text: string;
  usersViewModel: UsersViewModel;
  columns:DnColumnDto[]
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.usersViewModel = new UsersViewModel(this.http, this.auth);
    this.users_list_text = 'Users List';

  }

  ngOnInit() {
    this.getData();
    this.getColumns()
  }

  getData() {
    this.dataSource = this.usersViewModel.GetAll()
  }

  getColumns(){
    this.columns=[
      {
        DataField:'Id',
        DataType:'string',
        Caption:'Id',
        Visible:false
      },
      {
        DataField:'Name',
        DataType:'string',
        Caption:'Name',
      },
      {
        DataField:'Email',
        DataType:'string',
        Caption:'E-mail',
      },
      {
        DataField:'UserRole',
        DataType:'number',
        Caption:'UserRole',

      },
      {
        DataField:'buttons',
        DataType:'buttons',
        Caption:''
      }
    ]
  }
  editUser(data: any) {
    WebAppBase.data = data.Id;
    this.router.navigate(['user-edit']);
  }

  onInsertClicked(e: any) {
    this.router.navigate(['user-edit']);
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

  onRefreshClicked(e: any) {
    this.getData();
  }
}

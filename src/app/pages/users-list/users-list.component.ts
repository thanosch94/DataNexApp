import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { UsersViewModel } from '../../view-models/users.viewmodel';
import { Router } from '@angular/router';
import { WebAppBase } from '../../base/web-app-base';
import { AuthService } from '../../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { AsyncPipe } from '@angular/common';
import { BaseComponent } from '../components/base/base.component';
import { ColumnsService } from '../../services/columns.service';
import { GridColumns } from '../../base/grid-columns';

@Component({
  selector: 'app-users-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    DnToolbarComponent,
    MatTooltipModule,
    DnGridComponent,
    AsyncPipe,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent extends BaseComponent implements OnInit {
  @ViewChild('usersGrid') usersGrid: DnGridComponent;

  dataSource: any;
  users_list_text: string;
  usersViewModel: UsersViewModel;
  columns: DnColumnDto[];
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private columnsService: ColumnsService
  ) {
    super()
    this.usersViewModel = new UsersViewModel(this.http, this.auth);
    this.users_list_text = 'Users List';
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.dataSource = this.usersViewModel.GetAll();
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.UsersList)
  }

  editUser(data: any) {
    WebAppBase.data = data.Id;
    this.router.navigate(['user-edit']);
  }

  onInsertClicked(e: any) {
    this.router.navigate(['user-edit']);
  }

  deleteUser(data: any) {
    this.usersViewModel.DeleteById(data.Id).subscribe({
      next: () => {
        this.displayNotification('Record deleted')
        this.getData();
      },
      error: (err) => {
        this.displayErrorAlert(err)
      },
    });
  }

  onRefreshClicked(e: any) {
    this.getData();
  }
}

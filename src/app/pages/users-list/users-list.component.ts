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
import { DeleteUser, GetAllUsers } from '../../state/users/users.actions';
import { selectAllUsers } from '../../state/users/users.selectors';
import { Observable, Subject } from 'rxjs';
import { UserDto } from '../../dto/user.dto';

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

  dataSource$: Observable<UserDto[]>;
  users_list_text: string;
  columns: DnColumnDto[];
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private columnsService: ColumnsService) {
    super();
    this.users_list_text = 'Users List';

    this.tabsService.setActiveTabName(this.users_list_text);
  }

  ngOnInit() {
    this.setActionsResults();
    this.getColumns();
    this.getData();
  }

  getData() {
    this.store.dispatch(GetAllUsers.action());
    this.dataSource$ = this.store.select(selectAllUsers);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.UsersList);
  }

  editUser(data: any) {
    this.router.navigate(['user-edit'], { state: { id: data.Id } });
  }

  onInsertClicked(e: any) {
    this.router.navigate(['user-edit']);
  }

  deleteUser(data: any) {
    this.store.dispatch(DeleteUser.action({ id: data.Id }));
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        deleteSuccess: DeleteUser.actionSuccess,
        deleteFailure: DeleteUser.actionFailure,
      },
      {
        deleteSuccess: () => {
          this.displayNotification('Record deleted');
          this.getData();
        },
        deleteFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
      },
      this.destroy$
    );
  }
  //#endregion

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

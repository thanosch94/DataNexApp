import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { AuthService } from '../../services/auth.service';
import { LogDto } from '../../dto/log.dto';
import { LogsViewModel } from '../../view-models/logs.viewmodel';

@Component({
  selector: 'app-logs-list',
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
  templateUrl: './logs-list.component.html',
  styleUrl: './logs-list.component.css'
})
export class LogsListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('logsTable') logsTable: MatTable<LogDto>;

  displayedColumns: string[] = ['AddedDateTimeFormatted', 'LogName', 'LogTypeName', 'LogOriginName'];
  dataSource: MatTableDataSource<LogDto>;
  logsViewModel: LogsViewModel;
  logs_list_text: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.logsViewModel = new LogsViewModel(this.http, this.auth);
    this.logs_list_text = 'Logs';
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.logsViewModel.GetAll().subscribe((result: any) => {
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

  onRefreshBtnClicked(e: any) {
    this.getData();
    this.logsTable.renderRows();
  }
}

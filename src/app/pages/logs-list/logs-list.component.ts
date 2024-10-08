import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { AuthService } from '../../services/auth.service';
import { LogDto } from '../../dto/log.dto';
import { LogsViewModel } from '../../view-models/logs.viewmodel';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';

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
    DnGridComponent,
  ],
  templateUrl: './logs-list.component.html',
  styleUrl: './logs-list.component.css',
})
export class LogsListComponent {
  columns:any[]
  dataSource: LogDto[];
  logsViewModel: LogsViewModel;
  logs_list_text: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.logsViewModel = new LogsViewModel(this.http, this.auth);
    this.logs_list_text = 'Logs';
  }

  ngOnInit() {
    this.getData();
    this.getColumns()
  }

  getData() {
    this.logsViewModel.GetAll().subscribe((result: any) => {
      this.dataSource = result;

    });
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
        DataField:'AddedDateTimeFormatted',
        DataType:'string',
        Caption:'Date',
      },
      {
        DataField:'LogName',
        DataType:'string',
        Caption:'Name',
      },
      {
        DataField:'LogTypeName',
        DataType:'string',
        Caption:'Log Type',
      },
      {
        DataField:'LogOriginName',
        DataType:'string',
        Caption:'Log Origin',

      }]
  }

  onRefreshBtnClicked(e: any) {
    this.getData();
  }
}

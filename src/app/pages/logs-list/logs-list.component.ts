import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { AuthService } from '../../services/auth.service';
import { LogDto } from '../../dto/log.dto';
import { LogsViewModel } from '../../view-models/logs.viewmodel';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { ColumnsService } from '../../services/columns.service';
import { GridColumns } from '../../base/grid-columns';

@Component({
  selector: 'app-logs-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    DnToolbarComponent,
    DnGridComponent,
  ],
  templateUrl: './logs-list.component.html',
  styleUrl: './logs-list.component.css',
})
export class LogsListComponent {
  columns: DnColumnDto[];
  dataSource: LogDto[];
  logsViewModel: LogsViewModel;
  logs_list_text: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private columnsService: ColumnsService
  ) {
    this.logsViewModel = new LogsViewModel(this.http, this.auth);
    this.logs_list_text = 'Logs';
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.logsViewModel.GetAll().subscribe((result: any) => {
      this.dataSource = result;
    });
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.LogsList);
  }

  onRefreshBtnClicked(e: any) {
    this.getData();
  }
}

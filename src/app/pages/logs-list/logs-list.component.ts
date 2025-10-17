import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { LogDto } from '../../dto/log.dto';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { ColumnsService } from '../../services/columns.service';
import { GridColumns } from '../../base/grid-columns';
import { BaseComponent } from '../components/base/base.component';
import { GetAllLogs } from '../../state/logs/logs.actions';
import { selectAllLogs } from '../../state/logs/logs.selectors';
import { AsyncPipe } from '@angular/common';

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
    AsyncPipe
  ],
  templateUrl: './logs-list.component.html',
  styleUrl: './logs-list.component.css',
})
export class LogsListComponent extends BaseComponent {
  columns: DnColumnDto[];
  dataSource$: Observable<LogDto[]>;
  logs_list_text: string;

  constructor(
    private columnsService: ColumnsService
  ) {
    super()
    this.logs_list_text = 'Logs';
    this.tabsService.setActiveTabName(this.logs_list_text)
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.store.dispatch(GetAllLogs.action())
    this.dataSource$ = this.store.select(selectAllLogs);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.LogsList);
  }

  onRefreshBtnClicked(e: any) {
    this.getData();
  }
}

import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { StatusDto } from '../../../dto/status.dto';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { AsyncPipe } from '@angular/common';
import {
  DeleteStatusById,
  DeleteStatusByIdFailure,
  DeleteStatusByIdSuccess,
  GetAllStatusesByStatusType,
  InsertStatusDto,
  InsertStatusDtoFailure,
  InsertStatusDtoSuccess,
  UpdateStatusDto,
  UpdateStatusDtoFailure,
  UpdateStatusDtoSuccess,
} from '../../../state/parameters/statuses/statuses.actions';
import { selectAllStatusesByStatusType } from '../../../state/parameters/statuses/statuses.selectors';
import { BaseComponent } from '../../components/base/base.component';
import { AppTabDto } from '../../../dto/app-tab.dto';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-statuses-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './statuses-list.component.html',
  styleUrl: './statuses-list.component.css',
  providers: [],
})
export class StatusesListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('statusGrid')
  statusGrid: DnGridComponent;
  columns: any[];
  dataSource: any;
  statuses_list_text: string;
  private statusType: any;
  private destroy$ = new Subject<void>();

  constructor(
    private columnsService: ColumnsService,
    @Optional() @Inject('tab') tab: AppTabDto
  ) {
    super();
    this.statuses_list_text = 'Document Statuses List';
    this.statusType = tab.Params['StatusType']!;
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
  }

  getData() {
    this.store.dispatch(
      GetAllStatusesByStatusType({ statusType: this.statusType })
    );
    this.dataSource = this.store.select(
      selectAllStatusesByStatusType(this.statusType)
    );
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.Statuses);
  }

  onRowSaving(data: any) {
    let dto: StatusDto = { ...data };
    dto.StatusType = this.statusType;
    if (!dto.Id) {
      this.store.dispatch(InsertStatusDto({ dto }));
    } else {
      this.store.dispatch(UpdateStatusDto({ dto }));
    }
  }

  onInsertClicked(e: any) {
    this.statusGrid.add(e);
  }

  onRowDelete(data: any) {
    this.store.dispatch(DeleteStatusById({ id: data.Id }));
  }

  onRowStopEditing(e: any) {
    this.getData();
  }

  onRefreshBtnClicked(e: any) {
    this.getData();
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertStatusDtoSuccess,
        insertFailure: InsertStatusDtoFailure,
        updateSuccess: UpdateStatusDtoSuccess,
        updateFailure: UpdateStatusDtoFailure,
        deleteSuccess: DeleteStatusByIdSuccess,
        deleteFailure: DeleteStatusByIdFailure,
      },
      {
        insertSuccess: () => {
          this.displayNotification('Record inserted');
          this.getData();
        },
        insertFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateSuccess: () => {
          this.displayNotification('Record updated');
          this.getData();
        },
        updateFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
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

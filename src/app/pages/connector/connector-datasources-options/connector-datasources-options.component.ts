import { Observable, Subject } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import {
  faMagento,
  faOpencart,
  faShopify,
  faWordpress,
} from '@fortawesome/free-brands-svg-icons';
import { TabsService } from '../../../services/tabs.service';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { WooConnectionsDataDto } from '../../../dto/woo-connections-data.dto';
import { Router } from '@angular/router';
import { BaseComponent } from '../../components/base/base.component';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import {
  DeleteWooConnection,
  GetAllWooConnections,
  InsertWooConnection,
  UpdateWooConnection,
} from '../../../state/parameters/woo-connections/woo-connections.actions';
import { selectAllWooConnections } from '../../../state/parameters/woo-connections/woo-connections.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-connector-datasources-options',
  imports: [
    DnToolbarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    FontAwesomeModule,
    DnGridComponent,
    AsyncPipe,
  ],
  providers: [TabsService],
  templateUrl: './connector-datasources-options.component.html',
  styleUrl: './connector-datasources-options.component.css',
})
export class ConnectorDatasourcesOptionsComponent extends BaseComponent {
  @ViewChild('wooConnectionGrid') wooConnectionGrid: DnGridComponent;
  connector_datasource_options_text: string = 'Connector Datasource Options';

  faWordpress = faWordpress;
  faMagento = faMagento;
  faShopify = faShopify;
  faOpenCart = faOpencart;
  wooConnectionsDataSource$: Observable<WooConnectionsDataDto[]>;
  wooConnectionsColumns: DnColumnDto[] = [];
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private columnsService: ColumnsService) {
    super();
    this.tabsService.setTabName(this.connector_datasource_options_text);
  }

  ngOnInit() {
    this.setActionsResults();
    this.getColumns();
    this.getData();
  }

  getData() {
    this.store.dispatch(GetAllWooConnections.action());
    this.wooConnectionsDataSource$ = this.store.select(selectAllWooConnections);
  }

  getColumns() {
    this.wooConnectionsColumns = this.columnsService.getColumns(
      GridColumns.CntorDatasourcesOptions
    );
  }

  onCloseBtnClicked(e: any) {
    this.router.navigate(['connector-home']);
  }

  onWooConnectionAdding(e: any) {}

  onWooConnectionSaving(data: WooConnectionsDataDto) {
    let dto: WooConnectionsDataDto = { ...data };

    if (!dto.Id) {
      this.store.dispatch(InsertWooConnection.action({ dto }));
    } else {
      this.store.dispatch(UpdateWooConnection.action({ dto }));
    }
  }

  onWooConnectionDelete(data: WooConnectionsDataDto) {
    this.store.dispatch(DeleteWooConnection.action({ id: data.Id }));
  }

  onWooConnectionStopEditing(e: any) {
    this.getData();
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertWooSuccess: InsertWooConnection.actionSuccess,
        insertWooFailure: InsertWooConnection.actionFailure,
        updateWooSuccess: UpdateWooConnection.actionSuccess,
        updateWooFailure: UpdateWooConnection.actionFailure,
        deleteWooSuccess: DeleteWooConnection.actionSuccess,
        deleteWooFailure: DeleteWooConnection.actionFailure,
      },
      {
        insertWooSuccess: () => {
          this.displayNotification('Record inserted');
          this.getData();
        },
        insertWooFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateWooSuccess: () => {
          this.displayNotification('Record updated');
          this.getData();
        },
        updateWooFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        deleteWooSuccess: () => {
          this.displayNotification('Record deleted');
          this.getData();
        },
        deleteWooFailure: (result) => {
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

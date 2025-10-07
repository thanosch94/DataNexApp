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
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { TabsService } from '../../../services/tabs.service';
import { WooConnectionsViewModel } from '../../../view-models/woo-connections.viewmodel';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { WooConnectionsDataDto } from '../../../dto/woo-connections-data.dto';
import { Router } from '@angular/router';
import { BaseComponent } from '../../components/base/base.component';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';

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
  ],
  providers: [TabsService],
  templateUrl: './connector-datasources-options.component.html',
  styleUrl: './connector-datasources-options.component.css',
})
export class ConnectorDatasourcesOptionsComponent extends BaseComponent {
  @ViewChild('wooConnectionGrid') wooConnectionGrid: DnGridComponent;
  connector_datasource_options_text: any;

  faWordpress = faWordpress;
  faMagento = faMagento;
  faShopify = faShopify;
  faOpenCart = faOpencart;
  wooConnectionsViewModel: WooConnectionsViewModel;
  wooConnectionsDataSource: WooConnectionsDataDto;
  wooConnectionsColumns: DnColumnDto[] = [];
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private columnsService: ColumnsService
  ) {
    super();
    this.wooConnectionsViewModel = new WooConnectionsViewModel(
      this.http,
      this.auth
    );

    this.connector_datasource_options_text = 'Connector Datasource Options';
    this.tabsService.setTabName(this.connector_datasource_options_text);
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.wooConnectionsViewModel.GetAll().subscribe((result: any) => {
      this.wooConnectionsDataSource = result;
    });
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
    let newWooConnection:WooConnectionsDataDto ={...data}

    if (!newWooConnection.Id) {
      this.wooConnectionsViewModel
        .InsertDto(newWooConnection)
        .subscribe((result: any) => {
          this.displayNotification('Record inserted');
          this.getData();
        });
    } else {
      this.wooConnectionsViewModel
        .UpdateDto(newWooConnection)
        .subscribe((result: any) => {
          this.displayNotification('Record updated');
          this.getData();
        });
    }
  }

  onWooConnectionDelete(data: WooConnectionsDataDto) {
    this.wooConnectionsViewModel
      .DeleteById(data.Id)
      .subscribe((result: any) => {
        let index = this.wooConnectionGrid.matDataSource.data.indexOf(data);
        this.wooConnectionGrid.matDataSource.data.splice(index, 1);
        this.getData();
        this.wooConnectionGrid.table.renderRows();
        this.displayNotification('Record deleted');
      });
  }

  onWooConnectionStopEditing(e: any) {
    this.getData();
  }
}

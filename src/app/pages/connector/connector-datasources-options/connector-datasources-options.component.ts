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
import { MatSnackBar } from '@angular/material/snack-bar';
import { WooConnectionsViewModel } from '../../../view-models/woo-connections.viewmodel';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { WooConnectionsDataDto } from '../../../dto/woo-connections-data.dto';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-connector-datasources-options',
  standalone: true,
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
  templateUrl: './connector-datasources-options.component.html',
  styleUrl: './connector-datasources-options.component.css',
})
export class ConnectorDatasourcesOptionsComponent {
  @ViewChild('wooConnectionGrid') wooConnectionGrid:DnGridComponent
  connector_datasource_options_text: any;

  faWordpress = faWordpress;
  faMagento = faMagento;
  faShopify = faShopify;
  faOpenCart = faOpencart;
  wooConnectionsViewModel: WooConnectionsViewModel;
  wooConnectionsDataSource: any;
  wooConnectionsColumns: DnColumnDto[] = [];
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private tabsService: TabsService,
    private _snackBar: MatSnackBar
  ) {
    this.wooConnectionsViewModel = new WooConnectionsViewModel(
      this.http,
      this.auth
    );

    this.connector_datasource_options_text = 'Connector Datasource Options';
    tabsService.setTabName(this.connector_datasource_options_text);
  }

  ngOnInit() {
    this.getWooConnectionsData()
    this.getWooConnectionsColumns();

  }

  getWooConnectionsData(){
    this.wooConnectionsViewModel.GetAll().subscribe((result: any) => {
      this.wooConnectionsDataSource = result;
    });
  }
  getWooConnectionsColumns() {
    this.wooConnectionsColumns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'RequestType',
        DataType: 'number',
        Caption: 'Request Type',
      },
      {
        DataField: 'Endpoint',
        DataType: 'string',
        Caption: 'Endpoint',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }
  onCloseBtnClicked(e: any) {}

  onSaveBtnClicked(e: any) {
    // this._snackBar.open('Record inserted', '', {
    //   duration: 1000,
    //   panelClass: 'green-snackbar',
    // });
  }

  onWooConnectionSaving(data: WooConnectionsDataDto) {
    let newWooConnection = new WooConnectionsDataDto();

    if (data.Id) {
      newWooConnection.Id = data.Id;
    }
    newWooConnection.Name = data.Name;
    newWooConnection.Endpoint = data.Endpoint;
    newWooConnection.RequestType = data.RequestType;

    if (!newWooConnection.Id) {
      this.wooConnectionsViewModel
        .InsertDto(newWooConnection)
        .subscribe((result: any) => {
          this.displayNotification("Record inserted");
          this.getWooConnectionsData()

        });
    } else {
      this.wooConnectionsViewModel
        .UpdateDto(newWooConnection)
        .subscribe((result: any) => {
          this.displayNotification("Record updated");
          this.getWooConnectionsData()
        });
    }
  }

  onWooConnectionDelete(data: WooConnectionsDataDto) {
    this.wooConnectionsViewModel
      .DeleteById(data.Id)
      .subscribe((result: any) => {
        let index = this.wooConnectionGrid.dataSource.indexOf(data)
        this.wooConnectionGrid.dataSource.splice(index,1)
        this.getWooConnectionsData()
        this.wooConnectionGrid.table.renderRows()
        this.displayNotification("Record deleted");

      });
  }

  onWooConnectionStopEditing(e:any){
    this.getWooConnectionsData()

  }

  displayNotification(text:string){
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
      });
  }
}

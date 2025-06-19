import { BaseComponent } from './../../components/base/base.component';
import { ConnectorJobsViewModel } from './../../../view-models/connector-jobs.viewmodel';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TabsService } from '../../../services/tabs.service';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWordpress } from '@fortawesome/free-brands-svg-icons';
import { ConnectorReceiveTransferEditComponent } from '../connector-receive-transfer-edit/connector-receive-transfer-edit.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ConnectorJobTypeEnum } from '../../../enums/connector-job-type.enum';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { WooConnectionsDataDto } from '../../../dto/woo-connections-data.dto';
import { WooConnectionsViewModel } from '../../../view-models/woo-connections.viewmodel';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { RequestTypeEnumList } from '../../../enumLists/request-type.enumlist';
import { WooEntityEnumList } from '../../../enumLists/woo-entity.enumlist';
import { DnTextboxComponent } from '../../components/dn-textbox/dn-textbox.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ConnectorParametersDto } from '../../../dto/connector-parameters.dto';
import { ConnectorParametersViewModel } from '../../../view-models/connector-parameters.viewmodel';
import { DnSelectboxComponent } from '../../components/dn-selectbox/dn-selectbox.component';
import { dnIcons } from '../../../enumLists/dn-icon.list';
import { GetAllCntorDatasources } from '../../../state/parameters/connector-datasources/cntor-datasources.actions';
import { selectAllCntorDatasources } from '../../../state/parameters/connector-datasources/cntor-datasources.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-connector-receive-transfer',
  imports: [
    DnToolbarComponent,
    FontAwesomeModule,
    MatCardModule,
    CommonModule,
    MatTabsModule,
    DnGridComponent,
    DnTextboxComponent,
    ReactiveFormsModule,
    DnSelectboxComponent,
    DecimalPipe
  ],
  providers: [TabsService],
  templateUrl: './connector-receive-transfer.component.html',
  styleUrl: './connector-receive-transfer.component.css',
})
export class ConnectorReceiveTransferComponent
  extends BaseComponent
  implements OnInit
{
  @ViewChild('wooConnectionGrid') wooConnectionGrid: DnGridComponent;

  connector_receive_transfer_text: string;
  faWordpress = faWordpress;
  connectorJobsViewModel: ConnectorJobsViewModel;
  wooConnectionsViewModel: WooConnectionsViewModel;
  connectorParametersViewModel: ConnectorParametersViewModel;

  receiveConnectorJobs: any;
  transferConnectorJobs: any;
  wooConnectionsDataSource: any;
  wooConnectionsColumns: DnColumnDto[];
  consumerKeyHide: boolean = true;
  consumerSecretHide: boolean = true;
  credentialsForm: any;
  faIcons = dnIcons;
  cntor_datasources: any;
  cntor_target_datasources: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private tabsService: TabsService,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder
  ) {
    super();
    this.connector_receive_transfer_text = 'Wordpress';
    this.tabsService.setTabName(this.connector_receive_transfer_text);
    this.connectorJobsViewModel = new ConnectorJobsViewModel(
      this.http,
      this.auth
    );
    this.wooConnectionsViewModel = new WooConnectionsViewModel(
      this.http,
      this.auth
    );
    this.connectorParametersViewModel = new ConnectorParametersViewModel(
      this.http,
      this.auth
    );
  }

  ngOnInit() {
    this.initializeForms();
    //Endpoints Tab
    this.getWooConnectionsData();
    this.getWooConnectionsColumns();
    this.getCntorDatasources();
    //Jobs Tab
    this.getData();

    //Credentials Tab
    this.getCredentials();
  }

  initializeForms() {
    this.credentialsForm = this.formBuilder.group({
      WooBaseUrl: ['', null],
      WooConsumerKey: ['', null],
      WooConsumerSecret: ['', null],
    });
  }

  getCntorDatasources() {
    this.store.dispatch(GetAllCntorDatasources.action());
    this.cntor_datasources = this.store.select(selectAllCntorDatasources);
    this.cntor_target_datasources = this.store.select(
      selectAllCntorDatasources
    );
  }
  onDataSourceSelectionChanged(e: any) {
    debugger
    this.cntor_target_datasources = this.cntor_datasources.pipe(
      map((data: any) => data.filter((x:any)=>x.Id != e.value)))


  }

  getCredentials() {
    this.connectorParametersViewModel.GetAll().subscribe((result: any) => {
      if (result) {
        this.credentialsForm.patchValue(result);
      } else {
        this.credentialsForm.patchValue(new ConnectorParametersDto());
      }
    });
  }

  getData() {
    this.connectorJobsViewModel
      .GetAllByJobType(ConnectorJobTypeEnum.Receive)
      .subscribe((result: any) => {
        this.receiveConnectorJobs = result;
        this.connectorJobsViewModel
          .GetAllByJobType(ConnectorJobTypeEnum.Transfer)
          .subscribe((result: any) => {
            this.transferConnectorJobs = result;
          });
      });
  }
  onCloseBtnClicked(e: any) {
    this.router.navigate(['connector-home']);
  }

  onInsertBtnClicked(e: any) {
    const dialogRef = this.dialog.open(ConnectorReceiveTransferEditComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {},
      viewContainerRef: this.viewContainerRef,
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.getData();
      }
    });
  }

  onRefreshBtnClicked(e: any) {
    this.getData();
  }

  onJobClick(data: any) {
    const dialogRef = this.dialog.open(ConnectorReceiveTransferEditComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {
        Job: data,
      },
      viewContainerRef: this.viewContainerRef,
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.getData();
      }
    });
  }

  getWooConnectionsData() {
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
        Lookup: {
          DataSource: RequestTypeEnumList.value,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'WooEntity',
        DataType: 'number',
        Caption: 'Entity',
        Lookup: {
          DataSource: WooEntityEnumList.value,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
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

  onWooConnectionAdding(e: any) {}
  onWooConnectionSaving(data: WooConnectionsDataDto) {
    let newWooConnection = new WooConnectionsDataDto();

    if (data.Id) {
      newWooConnection.Id = data.Id;
    }
    newWooConnection.Name = data.Name;
    newWooConnection.Endpoint = data.Endpoint;
    newWooConnection.RequestType = data.RequestType;
    newWooConnection.WooEntity = data.WooEntity;
    if (!newWooConnection.Id) {
      this.wooConnectionsViewModel
        .InsertDto(newWooConnection)
        .subscribe((result: any) => {
          this.displayNotification('Record inserted');
          this.getWooConnectionsData();
        });
    } else {
      this.wooConnectionsViewModel
        .UpdateDto(newWooConnection)
        .subscribe((result: any) => {
          this.displayNotification('Record updated');
          this.getWooConnectionsData();
        });
    }
  }

  onWooConnectionDelete(data: WooConnectionsDataDto) {
    this.wooConnectionsViewModel
      .DeleteById(data.Id)
      .subscribe((result: any) => {
        let index = this.wooConnectionGrid.matDataSource.data.indexOf(data);
        this.wooConnectionGrid.matDataSource.data.splice(index, 1);
        this.getWooConnectionsData();
        this.wooConnectionGrid.table.renderRows();
        this.displayNotification('Record deleted');
      });
  }

  onWooConnectionStopEditing(e: any) {
    this.getWooConnectionsData();
  }

  onConsumerKeyHideClick(e: any) {
    this.consumerKeyHide = !this.consumerKeyHide;
    e.stopPropagation();
  }
  onConsumerSecretHideClick(e: any) {
    this.consumerSecretHide = !this.consumerSecretHide;
    e.stopPropagation();
  }
}

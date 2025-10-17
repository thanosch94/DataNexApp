import { BaseComponent } from './../../components/base/base.component';
import { ConnectorJobDto } from './../../../dto/connector-job.dto';
import { RequestTypeEnum } from './../../../enums/request-type.enum';
import { WooConnectionsDataDto } from './../../../dto/woo-connections-data.dto';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConnectorJobsViewModel } from '../../../view-models/connector-jobs.viewmodel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { Guid } from 'guid-typescript';
import { MatSelectModule } from '@angular/material/select';
import { WebAppBase } from '../../../base/web-app-base';
import { CommonModule } from '@angular/common';
import { ConnectorJobTypeEnumList } from '../../../enumLists/connector-job-type.enumlist';
import { ConnectorJobTypeEnum } from '../../../enums/connector-job-type.enum';
import { RequestTypeEnumList } from '../../../enumLists/request-type.enumlist';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ApiResponseDto } from '../../../dto/api-response.dto';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { DnTextboxComponent } from '../../components/dn-textbox/dn-textbox.component';
import { DnSelectboxComponent } from '../../components/dn-selectbox/dn-selectbox.component';
import { GetAllWooConnections } from '../../../state/parameters/woo-connections/woo-connections.actions';
import { selectAllWooConnections } from '../../../state/parameters/woo-connections/woo-connections.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-connector-receive-transfer-edit',
  imports: [
    DnToolbarComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    DnGridComponent,
    DnTextboxComponent,
    DnSelectboxComponent,
  ],
  templateUrl: './connector-receive-transfer-edit.component.html',
  styleUrl: './connector-receive-transfer-edit.component.css',
})
export class ConnectorReceiveTransferEditComponent
  extends BaseComponent
  implements OnInit
{
  jobId: Guid;
  dataSourcesList: any;
  dataSourceName: any;
  connector_receive_transfer_edit_text: string;
  connectorJob: ConnectorJobDto;
  connectorJobsViewModel: ConnectorJobsViewModel;
  wordpressDataSourceId: any;
  connectorJobTypeList: { Id: ConnectorJobTypeEnum; Name: string }[];
  wooConnectionsDataSource$: Observable<WooConnectionsDataDto[]>;
  wooConnectionRow: WooConnectionsDataDto = new WooConnectionsDataDto();
  requestTypes: { Id: RequestTypeEnum; Name: string }[];
  firstStepForm: any;
  connectorJobResponse: ApiResponseDto = new ApiResponseDto();
  wooItemsData: any;
  wooItemsColumns: any[] = new Array<any>();
  isLoading: boolean;
  secondStepForm: any;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    super();
    this.connector_receive_transfer_edit_text = 'New Job';
    this.connectorJobsViewModel = new ConnectorJobsViewModel(
      this.http,
      this.auth
    );

    if (this.dialogData) {
      this.jobId = dialogData?.Job?.Id;
    }
  }

  ngOnInit() {
    this.initializeForms();
    this.dataSourcesList = WebAppBase.connectorDataSourcesList;
    this.connectorJobTypeList = ConnectorJobTypeEnumList.value;
    this.requestTypes = RequestTypeEnumList.value;
    this.wordpressDataSourceId = WebAppBase.wordpressDataSource;

    this.store.dispatch(GetAllWooConnections.action());
    this.wooConnectionsDataSource$ = this.store.select(selectAllWooConnections);

    this.getData();
  }

  initializeForms() {
    this.firstStepForm = this.formBuilder.group({
      Icon: ['', null],
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      JobType: ['', Validators.required],
      DataSourceId: ['', Validators.required],
      WooConnectionDataSourceId: ['', null],
      RequestType: ['', null],
      Endpoint: ['', null],
    });

    this.secondStepForm = this.formBuilder.group({
      IsExecuted: [false, Validators.requiredTrue],
    });
  }
  getData() {
    if (this.jobId) {
      this.connectorJobsViewModel
        .GetById(this.jobId)
        .subscribe((result: any) => {
          this.connectorJob = result as ConnectorJobDto;

          if (
            this.connectorJob.DataSourceId.toString() ==
            WebAppBase.wordpressDataSource
          ) {
            this.getWooConnectionRow(result.WooConnectionDataSourceId);
          }
          this.firstStepForm.patchValue(this.connectorJob);
        });
    } else {
      this.connectorJob = new ConnectorJobDto();
    }
  }

  onCloseBtnClicked(e: any) {}

  onSaveBtnClicked(e: any) {
    if (this.connectorJob.Id) {
      this.connectorJobsViewModel
        .UpdateDto(this.connectorJob)
        .subscribe((result: any) => {
          this.connectorJob = result;
          this.displayNotification('Record Updated');
        });
    } else {
      this.connectorJobsViewModel
        .InsertDto(this.connectorJob)
        .subscribe((result: any) => {
          this.connectorJob = result;
          this.displayNotification('Record Inserted');
        });
    }
  }

  onWooConnectionSelection(data: any) {
    this.getWooConnectionRow(data.value);
  }

  getWooConnectionRow(id: any) {
    this.wooConnectionsDataSource$.subscribe((result: any) => {
      let wooConnectionDataSource = result.find((x: any) => x.Id == id);
      if (wooConnectionDataSource) {
        this.wooConnectionRow = wooConnectionDataSource;
        this.firstStepForm
          .get('Endpoint')
          .setValue(this.wooConnectionRow.Endpoint);
        this.getRequestType();
      }
    });
  }

  getRequestType() {
    let requestType = this.requestTypes.find(
      (x) => x.Id == this.wooConnectionRow.RequestType
    );
    if (requestType) {
      this.firstStepForm.get('RequestType').setValue(requestType.Name);
    }
  }

  onJobExecuteButtonClicked(e: any) {
    this.isLoading = true;
    this.connectorJobsViewModel
      .GetConnectorJobResult(this.connectorJob)
      .subscribe((result: ApiResponseDto) => {
        this.isLoading = false;
        this.connectorJobResponse = result;
        if (result.Success) {
          this.wooItemsData = result.Result;
          for (let key in result.Result[0]) {
            let column = new DnColumnDto();
            column.DataField = key;
            column.DataType = typeof result.Result[0][key];
            column.Caption = key;
            if (
              /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(result.Result[0][key])
            ) {
              column.DataType = 'date';
              column.Format = 'dd/MM/yyyy HH:mm:ss';
            }
            if (key == 'id') {
              column.Width = 100;
            } else if (key == 'name') {
              column.Width = 450;
            } else if (key == 'description') {
              column.WrapText = true;
            } else if (key == 'feature_image') {
              column.DataType = 'image';
            }

            this.wooItemsColumns.push(column);
          }
          //this.wooItemsColumns
          this.secondStepForm.get('IsExecuted').setValue(true);
        }
      });
  }
}

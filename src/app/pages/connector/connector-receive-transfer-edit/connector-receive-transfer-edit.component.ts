import { ConnectorJobDto } from './../../../dto/connector-job.dto';
import { RequestTypeEnum } from './../../../enums/request-type.enum';
import { WooConnectionsDataDto } from './../../../dto/woo-connections-data.dto';
import { WooConnectionsViewModel } from './../../../view-models/woo-connections.viewmodel';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConnectorJobsViewModel } from '../../../view-models/connector-jobs.viewmodel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { Guid } from 'guid-typescript';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { WebAppBase } from '../../../base/web-app-base';
import { CommonModule } from '@angular/common';
import { ConnectorJobTypeEnumList } from '../../../enumLists/connector-job-type.enumlist';
import { ConnectorJobTypeEnum } from '../../../enums/connector-job-type.enum';
import { RequestTypeEnumList } from '../../../enumLists/request-type.enumlist';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ApiResponseDto } from '../../../dto/api-response.dto';
import { Observable } from 'rxjs';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';

@Component({
  selector: 'app-connector-receive-transfer-edit',
  standalone: true,
  imports: [
    DnToolbarComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CdkTextareaAutosize,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    DnGridComponent
  ],
  templateUrl: './connector-receive-transfer-edit.component.html',
  styleUrl: './connector-receive-transfer-edit.component.css',
})
export class ConnectorReceiveTransferEditComponent implements OnInit {
  jobId: Guid;
  dataSourcesList: any;
  dataSourceName: any;
  connector_receive_transfer_edit_text: string;
  connectorJob: ConnectorJobDto;
  connectorJobsViewModel: ConnectorJobsViewModel;
  wordpressDataSourceId: any;
  connectorJobTypeList: { Id: ConnectorJobTypeEnum; Name: string }[];
  wooConnectionsViewModel: WooConnectionsViewModel;
  wooConnectionsDataSource: WooConnectionsDataDto[];
  wooConnectionRow: WooConnectionsDataDto = new WooConnectionsDataDto();
  requestTypes: { Id: RequestTypeEnum; Name: string }[];
  requestTypeName: string;
  dataSourceFormGroup: any;
  connectorJobResponse: ApiResponseDto;
  wooItemsData: any;
  wooItemsColumns: any[] =new Array<any>;
  isLoading: boolean;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.connector_receive_transfer_edit_text = 'New Job';
    this.connectorJobsViewModel = new ConnectorJobsViewModel(
      this.http,
      this.auth
    );
    this.wooConnectionsViewModel = new WooConnectionsViewModel(
      this.http,
      this.auth
    );

    this.dataSourceFormGroup = new FormGroup({
      jobTypeFormControl: new FormControl('', Validators.required),
      jobDataSourceFormControl: new FormControl('', Validators.required),
      wooConnectionFormControl: new FormControl(''),
      nameCtrl: new FormControl('', Validators.required),
      descrCtrl: new FormControl('', Validators.required),
    });

    if (this.dialogData) {
      this.jobId = dialogData?.Job?.Id;
    }
  }

  ngOnInit() {
    this.dataSourcesList = WebAppBase.connectorDataSourcesList;
    this.connectorJobTypeList = ConnectorJobTypeEnumList.value;
    this.requestTypes = RequestTypeEnumList.value;
    this.wooConnectionsViewModel.GetAll().subscribe((result: any) => {
      this.wooConnectionsDataSource = result;
    });
    this.wordpressDataSourceId = WebAppBase.wordpressDataSource;
    this.getData();
  }

  getData() {
    if (this.jobId) {
      this.connectorJobsViewModel
        .GetById(this.jobId)
        .subscribe((result: any) => {
          this.connectorJob = result as ConnectorJobDto;
          this.dataSourceFormGroup.controls.jobTypeFormControl.setValue(
            result.JobType
          );
          this.dataSourceFormGroup.controls.jobDataSourceFormControl.setValue(
            result.DataSourceId
          );
          if (
            this.connectorJob.DataSourceId.toString() ==
            WebAppBase.wordpressDataSource
          ) {
            this.dataSourceFormGroup.controls.wooConnectionFormControl.setValue(
              result.WooConnectionDataSourceId
            );
            this.getWooConnectionRow(result.WooConnectionDataSourceId);
          }
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

  onJobDataSourceSelection(data: any) {
    this.connectorJob.DataSourceId = data.value;
    if (
      this.connectorJob.DataSourceId.toString() ==
      WebAppBase.wordpressDataSource
    ) {
      this.dataSourceFormGroup.controls.wooConnectionFormControl =
        new FormControl('', Validators.required);
    }
  }

  onJobTypeSelection(data: any) {
    this.connectorJob.JobType = data.value;
  }

  onWooConnectionSelection(data: any) {
    this.connectorJob.WooConnectionDataSourceId = data.value;
    this.getWooConnectionRow(data.value);
  }

  getWooConnectionRow(id: any) {
    let wooConnectionDataSource = this.wooConnectionsDataSource.find(
      (x: any) => x.Id == id
    );
    if (wooConnectionDataSource) {
      this.wooConnectionRow = wooConnectionDataSource;
      this.getRequestType();
    }
  }

  getRequestType() {
    let requestType = this.requestTypes.find(
      (x) => x.Id == this.wooConnectionRow.RequestType
    );
    if (requestType) {
      this.requestTypeName = requestType.Name;
    }
  }
  displayNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
  }

  onJobExecuteButtonClicked(e:any){
    this.isLoading =true
    this.connectorJobsViewModel.GetConnectorJobResult(this.connectorJob).subscribe((result:ApiResponseDto)=>{
        this.isLoading =false
      this.connectorJobResponse = result
     if(result.Success){
        this.wooItemsData = result.Result
        for (let key in result.Result[0]){
          let column = new DnColumnDto()
          column.DataField = key
          column.DataType = typeof(result.Result[0][key])
          column.Caption = key
          debugger
          if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(result.Result[0][key])){
              column.DataType='date'
              column.Format ='dd/MM/yyyy HH:mm:ss'
          }

          this.wooItemsColumns.push(column)
        }
        //this.wooItemsColumns

     }
  })
}
}

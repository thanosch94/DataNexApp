import { RequestTypeEnum } from './../../../enums/request-type.enum';
import { WooConnectionsDataDto } from './../../../dto/woo-connections-data.dto';
import { WooConnectionsViewModel } from './../../../view-models/woo-connections.viewmodel';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectorJobsViewModel } from '../../../view-models/connector-jobs.viewmodel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { Guid } from 'guid-typescript';
import { ConnectorJobDto } from '../../../dto/connector-job.dto';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { WebAppBase } from '../../../base/web-app-base';
import { CommonModule } from '@angular/common';
import { ConnectorJobTypeEnumList } from '../../../enumLists/connector-job-type.enumlist';
import { ConnectorJobTypeEnum } from '../../../enums/connector-job-type.enum';
import { RequestTypeEnumList } from '../../../enumLists/request-type.enumlist';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-connector-receive-transfer-edit',
  standalone: true,
  imports: [DnToolbarComponent,MatFormFieldModule,MatInputModule,FormsModule, CdkTextareaAutosize,MatSelectModule, CommonModule, ReactiveFormsModule],
  templateUrl: './connector-receive-transfer-edit.component.html',
  styleUrl: './connector-receive-transfer-edit.component.css'
})
export class ConnectorReceiveTransferEditComponent implements OnInit {
  jobId:Guid
  dataSourcesList:any;
  dataSourceName:any;
  connector_receive_transfer_edit_text: string;
  connectorJob:ConnectorJobDto;
  connectorJobsViewModel: ConnectorJobsViewModel;
  wordpressDataSourceId: any;
  connectorJobTypeList: { Id: ConnectorJobTypeEnum; Name: string; }[];
  wooConnectionsViewModel: WooConnectionsViewModel;
  wooConnectionsDataSource: any;
  wooConnectionRow: WooConnectionsDataDto = new WooConnectionsDataDto();
  requestTypes: { Id: RequestTypeEnum; Name: string; }[];
  requestTypeName: string;
  jobTypeFormControl = new FormControl()
  JobDataSourceFormControl = new FormControl()
  wooConnectionFormControl = new FormControl()
  constructor(private http:HttpClient, private auth:AuthService, private snackBar:MatSnackBar){
    this.connector_receive_transfer_edit_text ="New Job"
    this.connectorJobsViewModel = new ConnectorJobsViewModel(this.http, this.auth)
    this.wooConnectionsViewModel = new WooConnectionsViewModel(this.http, this.auth)

  }

  ngOnInit() {
    this.getData()
    this.dataSourcesList = WebAppBase.connectorDataSourcesList
    this.connectorJobTypeList = ConnectorJobTypeEnumList.value
    this.requestTypes = RequestTypeEnumList.value;
    this.wooConnectionsViewModel.GetAll().subscribe((result:any)=>{
      this.wooConnectionsDataSource = result
    })
    this.wordpressDataSourceId = WebAppBase.wordpressDataSource
  }

  getData(){
    if(this.jobId){
      this.connectorJobsViewModel.GetById(this.jobId).subscribe((result:any)=>{
        this.connectorJob = result
      })
    }else{
      this.connectorJob = new ConnectorJobDto()
    }
  }

  onCloseBtnClicked(e:any){

  }

  onSaveBtnClicked(e:any){
    this.connectorJobsViewModel.InsertDto(this.connectorJob).subscribe((result:any)=>{
      this.connectorJob = result
      this.displayNotification("Record Inserted")
    })
  }

  onJobDataSourceSelection(data:any){
    this.connectorJob.DataSourceId =data.value
  }

  onJobTypeSelection(data:any){
    this.connectorJob.JobType =data.value
  }

  onWooConnectionSelection(data:any){
    this.connectorJob.WooConnectionDataSourceId =data.value
    let WooConnectionDataSource = this.wooConnectionsDataSource.find((x:any)=>x.Id==data.value)
    if(WooConnectionDataSource){
      this.wooConnectionRow =WooConnectionDataSource
      let requestType = this.requestTypes.find(x=>x.Id==this.wooConnectionRow.RequestType)
      if(requestType){
        this.requestTypeName = requestType.Name
      }
    }
  }

  displayNotification(text:string){
    this.snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
      });
  }
}

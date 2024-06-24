import { ConnectorJobsViewModel } from './../../../view-models/connector-jobs.viewmodel';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TabsService } from '../../../services/tabs.service';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWordpress } from '@fortawesome/free-brands-svg-icons';
import { ConnectorReceiveTransferEditComponent } from '../connector-receive-transfer-edit/connector-receive-transfer-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ConnectorJobTypeEnum } from '../../../enums/connector-job-type.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connector-receive-transfer',
  standalone: true,
  imports: [DnToolbarComponent,FontAwesomeModule, MatCardModule, CommonModule],
  providers: [TabsService],
  templateUrl: './connector-receive-transfer.component.html',
  styleUrl: './connector-receive-transfer.component.css',
})
export class ConnectorReceiveTransferComponent implements OnInit {
  connector_receive_transfer_text: string;
  faWordpress = faWordpress
  connectorJobsViewModel: ConnectorJobsViewModel;
  receiveConnectorJobs: any;
  transferConnectorJobs: any;
  constructor(private http:HttpClient, private auth:AuthService, private tabsService: TabsService, private router: Router, private dialog:MatDialog, private viewContainerRef:ViewContainerRef) {
    this.connector_receive_transfer_text = 'Receive - Transfer Data';
    tabsService.setTabName(this.connector_receive_transfer_text);
    this.connectorJobsViewModel = new ConnectorJobsViewModel(this.http, this.auth)
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.connectorJobsViewModel.GetAllByJobType(ConnectorJobTypeEnum.Receive).subscribe((result:any)=>{
      this.receiveConnectorJobs = result
      this.connectorJobsViewModel.GetAllByJobType(ConnectorJobTypeEnum.Transfer).subscribe((result:any)=>{
        this.transferConnectorJobs = result
      })
    })
  }
  onCloseBtnClicked(e: any) {
    this.router.navigate(['connector-home']);
  }

  onInsertBtnClicked(e:any){
    const dialogRef = this.dialog.open(ConnectorReceiveTransferEditComponent, {
      width: '650px',
      height: '550px',
      data: {
      },
      viewContainerRef: this.viewContainerRef,
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.getData()
      }
    });  }

    onRefreshBtnClicked(e:any){
      this.getData()
    }

    onJobClick(data:any){
      const dialogRef = this.dialog.open(ConnectorReceiveTransferEditComponent, {
        width: '650px',
        height: '550px',
        data: {
          Job:data
        },
        viewContainerRef: this.viewContainerRef,
      });
      dialogRef.afterClosed().subscribe((confirm) => {
        if (confirm) {
          this.getData()
        }
      });  }
}

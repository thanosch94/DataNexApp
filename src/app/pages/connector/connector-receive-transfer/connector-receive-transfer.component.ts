import { Component, ViewContainerRef } from '@angular/core';
import { TabsService } from '../../../services/tabs.service';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWordpress } from '@fortawesome/free-brands-svg-icons';
import { ConnectorReceiveTransferEditComponent } from '../connector-receive-transfer-edit/connector-receive-transfer-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-connector-receive-transfer',
  standalone: true,
  imports: [DnToolbarComponent,FontAwesomeModule, MatCardModule],
  providers: [TabsService],
  templateUrl: './connector-receive-transfer.component.html',
  styleUrl: './connector-receive-transfer.component.css',
})
export class ConnectorReceiveTransferComponent {
  connector_receive_transfer_text: string;
  faWordpress = faWordpress
  constructor(private tabsService: TabsService, private router: Router, private dialog:MatDialog, private viewContainerRef:ViewContainerRef) {
    this.connector_receive_transfer_text = 'Receive - Transfer Data';
    tabsService.setTabName(this.connector_receive_transfer_text);
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
      }
    });  }
}

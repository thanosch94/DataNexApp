import { Component, Inject, Optional } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';

@Component({
    selector: 'app-dn-alert',
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle
    ],
    templateUrl: './dn-alert.component.html',
    styleUrl: './dn-alert.component.css'
})
export class DnAlertComponent {
message: any;
  title: any;

constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any){
  this.title = data.Title;
  this.message = data.Message
}
}

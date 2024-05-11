import { Component, Inject, Optional } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
content: any;
  title: any;
constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any){
  if(data){
    this.content = data.Content;
    this.title = data.Title;
  }
}
}

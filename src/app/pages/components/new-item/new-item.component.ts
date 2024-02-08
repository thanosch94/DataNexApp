import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Optional } from '@angular/core';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [MatDialogModule,MatFormFieldModule, FormsModule,MatButtonModule,MatInputModule],
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

title:string;

itemName:string;
  constructor(
    public dialogRef: MatDialogRef<NewItemComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)  {

    this.title = data.title
    this.itemName = data.name
   }

  ngOnInit() {
  }

  noContent(){

  }
}

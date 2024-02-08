import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [MatDialogModule,MatFormFieldModule, FormsModule,MatButtonModule,MatInputModule],
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
title:string;

newItemName:string;
  constructor() {
    this.title = "New Item"
   }

  ngOnInit() {
  }

  noContent(){

  }
}

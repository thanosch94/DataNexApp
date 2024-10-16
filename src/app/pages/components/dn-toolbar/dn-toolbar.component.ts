import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'dn-toolbar',
  standalone: true,
  imports: [    MatDialogActions,
    MatButtonModule,
    MatDialogModule,MatToolbarModule,MatIconModule,CommonModule],
  templateUrl: './dn-toolbar.component.html',
  styleUrl: './dn-toolbar.component.css'
})
export class DnToolbarComponent {
@Input() canExit:boolean;
@Input() canSave:boolean;
@Input() canDelete:boolean;
@Input() canInsert:boolean;
@Input() canRefresh:boolean;
@Input() canTransform:boolean;
@Input() title:string;
@Input() entityId?:Guid;
@Input() isDialog:boolean;
@Input() visible:boolean = true;

@Output()onDeleteBtnClicked = new EventEmitter()
@Output()onSaveBtnClicked = new EventEmitter()
@Output()onCloseBtnClicked = new EventEmitter()
@Output()onInsertBtnClicked = new EventEmitter()
@Output()onRefreshBtnClicked = new EventEmitter()
@Output()onTransformedBtnClicked = new EventEmitter()

onDeleteClicked(e:any){
  this.onDeleteBtnClicked.emit(e)
}

onSaveClicked(e:any){
  this.onSaveBtnClicked.emit(e)
}
onCloseClicked(e:any){
  this.onCloseBtnClicked.emit(e)
}

onInsertClicked(e:any){
  this.onInsertBtnClicked.emit(e)
}

onRefreshClicked(e:any){
  this.onRefreshBtnClicked.emit(e)
}

onTransformedClicked(e:any){
  this.onTransformedBtnClicked.emit(e)
}

}

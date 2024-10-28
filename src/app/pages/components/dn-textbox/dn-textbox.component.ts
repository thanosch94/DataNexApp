import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'dn-textbox',
  standalone: true,
  imports: [    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ReactiveFormsModule,
  FormsModule,
  MatIconModule,
  MatSuffix,
  MatPrefix,
  MatTooltipModule
],
  templateUrl: './dn-textbox.component.html',
  styleUrl: './dn-textbox.component.css'
})
export class DnTextboxComponent {
  @Input() label: string;
  @Input() readOnly: boolean;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() value: any;
  @Input() width: number = 100;
  @Output() valueChange = new EventEmitter();
  @Input() icon: string|undefined;
  @Input() iconPosition?: string = "end";
  @Input() iconTooltip: string='';
  @Output() onIconClicked = new EventEmitter();

  onValueChange(value:string){
    this.valueChange.emit(value)
  }

  onIconClick(e:any){
    e.value=this.value;
    this.onIconClicked.emit(e)
  }

}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NumberFormatPipe } from '../../../pipes/number-format.pipe';

@Component({
  selector: 'dn-number-box',
  standalone: true,
  imports: [    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ReactiveFormsModule,
  FormsModule,
  MatIconModule,
  MatSuffix,
  MatPrefix,
  MatTooltipModule,
  NumberFormatPipe
],
  templateUrl: './dn-number-box.component.html',
  styleUrl: './dn-number-box.component.css'
})
export class DnNumberBoxComponent {
  @Input() label: string;
  @Input() hideArrows: boolean = false;
  @Input() min: number|null;
  @Input() max: number|null;
  @Input() placeholder: string;
  @Input() readOnly: boolean;
  @Input() name: string;
  @Input() value: any;
  @Input() width: number = 100;
  @Input() icon: string|undefined;
  @Input() iconPosition?: string = "end";
  @Input() iconTooltip: string='';
  @Output() valueChange = new EventEmitter();
  @Output() onIconClicked = new EventEmitter();
  @Output() onFocusOut = new EventEmitter();
  @Output() onClick = new EventEmitter();
  formattedvalue: any;


  onValueChange(value:number){
    //this.value = value
    //this.formattedvalue =value?.toFixed(2)
    this.valueChange.emit(this.value)
  }

  onInputClick(e:any){
    this.onClick.emit(e)
  }

  onIconClick(e:any){
    e.value=this.value;
    this.onIconClicked.emit(e)
  }

  onBlur(){
    this.onFocusOut.emit(this.value)
  }

}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
  MatPrefix
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
  @Input() iconPosition: string|undefined = "end";
  @Output() valueChange = new EventEmitter();
  @Output() onIconClicked = new EventEmitter();


  onValueChange(value:number){
    this.valueChange.emit(value)
  }

  onIconClick(e:any){
    e.value=this.value;
    this.onIconClicked.emit(e)
  }
}

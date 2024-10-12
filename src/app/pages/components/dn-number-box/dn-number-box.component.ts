import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'dn-number-box',
  standalone: true,
  imports: [    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ReactiveFormsModule,
  FormsModule,
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
  @Input() width: number;
  @Output() valueChange = new EventEmitter();

  onValueChange(value:number){
    this.valueChange.emit(value)
  }
}

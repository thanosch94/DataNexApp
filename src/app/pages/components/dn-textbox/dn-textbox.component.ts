import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'dn-textbox',
  standalone: true,
  imports: [    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ReactiveFormsModule,
  FormsModule,
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
  @Input() width: number;
  @Output() valueChange = new EventEmitter();

  onValueChange(value:string){
    this.valueChange.emit(value)
  }
}

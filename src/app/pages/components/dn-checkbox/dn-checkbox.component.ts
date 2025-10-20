import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'dn-checkbox',
    imports: [MatCheckboxModule, CommonModule, FormsModule],
    templateUrl: './dn-checkbox.component.html',
    styleUrl: './dn-checkbox.component.css'
})
export class DnCheckboxComponent {
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() name: string;
  @Input() value: any;
  @Output() valueChange = new EventEmitter();

  onValueChange(value:any){
    this.valueChange.emit(value)
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'dn-date-box',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatDatepickerModule,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './dn-date-box.component.html',
    styleUrl: './dn-date-box.component.css'
})
export class DnDateBoxComponent {
  @Input() label: string;
  @Input() readOnly: boolean;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() value: any;
  @Input() width: number;
  @Output() valueChange = new EventEmitter();

  onValueChange(value: string) {
    this.valueChange.emit(value);
  }
}

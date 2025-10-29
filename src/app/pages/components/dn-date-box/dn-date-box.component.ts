import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, input, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
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

    providers: [provideNativeDateAdapter(),{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DnDateBoxComponent),
      multi: true,
    }],
    templateUrl: './dn-date-box.component.html',
    styleUrl: './dn-date-box.component.css'
})
export class DnDateBoxComponent {
  appearance =input<MatFormFieldAppearance>("outline")
  @Input() label: string;
  @Input() readOnly: boolean;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() value: any;
  @Input() width: number;
  @Output() valueChange = new EventEmitter();
  @Input() disabled: boolean;

  @Output() disabledChange = new EventEmitter();

  onValueChange(value: string) {
    this.valueChange.emit(value);
    this.onChange(value)
  }


//#region  Reactive Forms
onChange: (value: string) => void = () => {
};
onTouched: () => void = () => {

};

writeValue(value: string): void {
  this.value = value || '';
}
registerOnChange(fn: (value: string) => void): void {
  this.onChange = fn;
}
registerOnTouched(fn: any): void {
  this.onTouched = fn;
}
setDisabledState?(isDisabled: boolean): void {}

//#endregion

}

import { Component, forwardRef, Input, input } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'dn-textarea',
  imports: [MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './dn-textarea.component.html',
  styleUrl: './dn-textarea.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DnTextareaComponent),
      multi: true,
    },
  ],
})
export class DnTextareaComponent {
  label = input<string>();
  width = input<number>(100);
  @Input() value:string;
  placeholder = input<string>('');


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

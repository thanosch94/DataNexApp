import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, output, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatFormFieldModule,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'dn-textbox',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatSuffix,
    MatPrefix,
    MatTooltipModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DnTextboxComponent),
      multi: true,
    }
  ],
  templateUrl: './dn-textbox.component.html',
  styleUrl: './dn-textbox.component.css',
})
export class DnTextboxComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() readOnly: boolean;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() value: any;
  @Input() width: number = 100;
  valueChange = output<string>();
  @Input() icon: string | undefined;
  @Input() iconPosition?: string = 'end';
  @Input() iconTooltip: string = '';
  @Input() type: string = 'text';
  @Output() onIconClicked = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onInput = new EventEmitter();

  onValueChange(value: string) {
    debugger
    this.valueChange.emit(value);
    this.onChange(this.value);

  }

  onIconClick(e: any) {
    e.value = this.value;
    this.onIconClicked.emit(e);
  }

  onValueInput(e: any) {
    this.onInput.emit(e);
  }
  onInputBlur(e: any) {
    this.onBlur.emit(e);
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

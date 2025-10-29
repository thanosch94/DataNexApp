import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  effect,
  EventEmitter,
  forwardRef,
  input,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'dn-selectbox',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatPseudoCheckboxModule,
    MatIconModule,
    MatSuffix,
    MatTooltipModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DnSelectboxComponent),
      multi: true,
    },
  ],
  templateUrl: './dn-selectbox.component.html',
  styleUrl: './dn-selectbox.component.css',
})
export class DnSelectboxComponent {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  appearance = input<MatFormFieldAppearance>('outline');
  @Input() label: string;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() inputType: string = 'text';
  value = input<any>();
  @Input() valueExpr: string;
  @Input() displayExpr: string;
  dataSource = input<any>();
  @Input() width: number = 100;
  @Input() icon: string | undefined;
  @Input() iconPosition?: string = 'end';
  @Input() iconTooltip: string = '';
  @Input() optionsTemplate: boolean;
  @Input() panelWidth: number | string;
  @Input() useCustomValueTemplate: boolean = false; //Used this to add custom template with icon when option is selected
  @Input() allowInput: boolean = true;
  disabled = input<boolean>(false);
  @Output() onIconClicked = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @Output() onClick = new EventEmitter();
  @Output() onBlur = new EventEmitter();

  @Output() disabledChange = new EventEmitter();

  previousValue: any;
  selectedOption: any;
  isOptionsPanelEnabled: boolean = true;
  myControl = new FormControl('');
  filteredOptions: Observable<any[]>;
  @ViewChild(MatAutocomplete) myAutocomplete: MatAutocomplete;

  constructor() {
    effect(() => {
      if (this.dataSource()) {
        this.filteredOptions = of(this.dataSource());
      }
      if (this.value()) {
        this.myControl.setValue(this.value());
        let data = this.dataSource().find(
          (x: any) => x[this.valueExpr] == this.value()
        );
        this.filteredOptions = of(this._filter(data[this.displayExpr]));
        //Give a few miliseconds in order viewchild to get options
        setTimeout(() => {
          const selMatOption = this.myAutocomplete.options
            .toArray()
            .find(
              (o) =>
                o.value ===
                this.dataSource().find(
                  (x: any) => x[this.valueExpr] == this.value()
                )
            );
            //Manually select the selected :)
          selMatOption?.select();
        }, 0);
      }
      if (this.disabled()) {
        this.myControl.disable();
      } else {
        this.myControl.enable();
      }
    });
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(this.myControl.value ?? ''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    let filterValue = '';
    if (typeof value == 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value == 'object') {
      filterValue = (value[this.displayExpr] as any).toLowerCase();
    }
    if (this.dataSource()) {
      return this.dataSource()!.filter((option: any) =>
        option[this.displayExpr].toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }
  onInput(e: any) {
    this.myControl.setValue(e.target.value);
    this.filteredOptions = of(this._filter(e.target.value));
  }

  onValueChanged(data: any) {
    this.selectedOption = this.dataSource()?.find(
      (option: any) => option[this.valueExpr] == data[this.valueExpr]
    );
    this.valueChange.emit(this.selectedOption[this.valueExpr]);
    let dto = {
      value: this.selectedOption[this.valueExpr],
      previousValue: this.previousValue,
    };
    this.selectionChange.emit(dto);
    this.previousValue = this.selectedOption[this.valueExpr];
    this.onChange(this.selectedOption[this.valueExpr]);
  }

  onInputClick(e: any) {
    this.isOptionsPanelEnabled = true;
    this.onClick.emit(e);
  }

  onInputBlur(e: any) {
    this.onBlur.emit(e);
  }

  display(data: any) {
    if (data) {
      debugger;
      if (typeof data == 'object') {
        return data[this.displayExpr];
      } else if (typeof data == 'string' || 'number') {
        this.selectedOption = this.dataSource()?.find(
          (option: any) => option[this.displayExpr] === data
        );
        if (this.selectedOption == undefined) {
          this.selectedOption = this.dataSource()?.find(
            (option: any) => option[this.valueExpr] === data
          );
        }
        return this.selectedOption[this.displayExpr];
      }
    }
  }

  optionsTrackBy(index: number, option: any) {
    return option[this.valueExpr];
  }
  compareFn(a: any, b: any) {
    return a.Id == b;
  }

  onIconClick(e: any) {
    this.isOptionsPanelEnabled = false;
    e.value = this.value();
    this.onIconClicked.emit(e);
  }

  //#region  Reactive Forms
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    //this.value = value || '';
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

import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, forwardRef, input, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

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
        MatPrefix,
        MatTooltipModule,
        MatSelectModule,
    ],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DnSelectboxComponent),
          multi: true,
        }
      ],
    templateUrl: './dn-selectbox.component.html',
    styleUrl: './dn-selectbox.component.css'
})
export class DnSelectboxComponent {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() inputType: string = 'text';
  @Input() value: any;
  @Input() valueExpr: string;
  @Input() displayExpr: string;
  @Input() dataSource: any;
  @Input() width: number = 100;
  @Input() icon: string|undefined;
  @Input() iconPosition?: string = "end";
  @Input() iconTooltip: string='';
  @Input() optionsTemplate: boolean;
  @Input() panelWidth: number|string;
  @Input() useCustomValueTemplate: boolean=false; //Used this to add custom template with icon when option is selected
  @Input() allowInput: boolean=true;
  @Input() disabled: boolean=false;
  @Output() onIconClicked = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @Output() onClick = new EventEmitter();
  @Output() onBlur = new EventEmitter();

  @Output() disabledChange = new EventEmitter();

  previousValue:any
  selectedOption: any;
  isOptionsPanelEnabled: boolean =true;

  onValueChanged(data: any) {
    this.selectedOption = this.dataSource.find(
      (option: any) => option[this.valueExpr] == data[this.valueExpr]
    );

    this.valueChange.emit(this.selectedOption[this.valueExpr]);
    let dto ={value:this.selectedOption[this.valueExpr], previousValue:this.previousValue}
    this.selectionChange.emit(dto);
    this.previousValue =this.selectedOption[this.valueExpr]
    this.onChange(this.selectedOption[this.valueExpr]);

  }


  onInputClick(e:any){
    this.isOptionsPanelEnabled=true;
    this.onClick.emit(e)
  }
  onInputBlur(e:any){
    this.onBlur.emit(e)
  }

  display(data: any) {
    if (data) {
      if (typeof data == 'object') {
        return data[this.displayExpr];
      } else if (typeof data == 'string' || 'number') {
        this.selectedOption = this.dataSource.find(
          (option: any) => option[this.displayExpr] == data
        );
        if(this.selectedOption==undefined){
          this.selectedOption = this.dataSource.find(
            (option: any) => option[this.valueExpr] == data
          );
        }
        this.value = this.selectedOption[this.valueExpr];

        return this.selectedOption[this.displayExpr];
      }
    }
  }

  optionsTrackBy(index: number, option: any) {
    return option[this.valueExpr];
  }
  compareFn (a: any, b: any) {
    return a.Id == b
  };

  isOptionSelected(e: any) {
    if (this.selectedOption) {
      if ((this.value = this.selectedOption[this.valueExpr])) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onIconClick(e:any){
    this.isOptionsPanelEnabled= false
    e.value=this.value;
    this.onIconClicked.emit(e)
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

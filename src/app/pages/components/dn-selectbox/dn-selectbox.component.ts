import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
        MatTooltipModule
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
  @Output() onIconClicked = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  @Output() onClick = new EventEmitter();

  selectedOption: any;
  isOptionsPanelEnabled: boolean =true;

  onSelection(data: any) {
    this.selectedOption = this.dataSource.find(
      (option: any) => option[this.valueExpr] == data[this.valueExpr]
    );

    this.valueChange.emit(this.selectedOption[this.valueExpr]);
  }

  onInputClick(e:any){
    this.isOptionsPanelEnabled=true;
    this.onClick.emit(e)
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

}

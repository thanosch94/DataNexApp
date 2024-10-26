import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'dn-selectbox',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatPseudoCheckboxModule,
  ],
  templateUrl: './dn-selectbox.component.html',
  styleUrl: './dn-selectbox.component.css',
})
export class DnSelectboxComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() inputType: string = 'text';
  @Input() value: any;
  @Input() valueExpr: string;
  @Input() displayExpr: string;
  @Input() dataSource: any;
  @Input() width: number = 100;
  @Output() valueChange = new EventEmitter();
  selectedOption: any;

  onSelection(data: any) {
    debugger;
    this.selectedOption = this.dataSource.find(
      (option: any) => option[this.valueExpr] == data[this.valueExpr]
    );

    this.valueChange.emit(this.selectedOption.Id);
  }

  display(data: any) {
    if (data) {
      if (typeof data == 'object') {
        return data[this.displayExpr];
      } else if (typeof data == 'string' || 'number') {
        this.selectedOption = this.dataSource.find(
          (option: any) => option[this.valueExpr] == data
        );
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
}

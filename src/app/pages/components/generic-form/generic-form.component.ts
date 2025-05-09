import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-generic-form',
  imports: [],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.css'
})
export class GenericFormComponent extends BaseComponent {

  markAllAsTouched(form:FormGroup) {
    Object.keys(form.controls).forEach((field) => {
      form.controls[field].markAsTouched();
    });
  }

  markAsTouched(form:FormGroup, field: string){
    form.controls[field].markAsTouched();

  }

  isTouchedOrInvalid(form:FormGroup, field: string) {
    return (
      form.get(field)!.touched && form.get(field)!.invalid
    );
  }

  onInputChange(form: FormGroup, field: string) {
    const control = form.get(field);
    if (control && !control.touched) {
      control.markAsTouched();
    }
    control?.updateValueAndValidity();
  }
}

import { Component, inject, Inject, Optional } from '@angular/core';
import { DnTextboxComponent } from '../dn-textbox/dn-textbox.component';
import { DnToolbarComponent } from '../dn-toolbar/dn-toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDto } from '../../../dto/user.dto';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GenericFormComponent } from '../generic-form/generic-form.component';
import { CommonModule } from '@angular/common';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-change-password',
  imports: [
    DnTextboxComponent,
    DnToolbarComponent,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatError,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent extends GenericFormComponent {
  newPassword: string;
  confirmPassword: string;
  new_password_text: string;
  user: UserDto;
  form: FormGroup;
  displayNotMatchError: boolean;
  dialogRef = inject(MatDialogRef<ChangePasswordComponent>);

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    super();
    if (data) {
      this.user = data.User;
      this.new_password_text = 'New Password';
    }
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmNewPassword: [''],
    });
  }

  onCloseClicked(e: any) {
    this.dialogRef.close();
  }

  onSubmitPassWordChange(e: any) {
    if (this.form.valid) {
      this.checkPasswordsMatch(this.form.get('confirmNewPassword')?.value);
    } else {
      this.markAllAsTouched(this.form);
    }
  }

  onCofirmPasswordValueChange(value: string) {
    this.checkPasswordsMatch(value);
  }

  checkPasswordsMatch(value: string) {
    let matchValidator = this.form.get('newPassword')?.value == value;
    if (!matchValidator) {
      this.displayNotMatchError = true;
    } else {
      this.displayNotMatchError = false;
    }
  }
}

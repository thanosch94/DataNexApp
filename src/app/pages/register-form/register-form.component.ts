import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WebAppBase } from '../../base/web-app-base';
import { ApiResponseDto } from '../../dto/api-response.dto';
import { UserDto } from '../../dto/user.dto';
import { AuthService } from '../../services/auth.service';
import { GeneralOptionsViewModel } from '../../view-models/general-options.viewmodel';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterDto } from '../../dto/register.dto';
import { DnCheckboxComponent } from '../components/dn-checkbox/dn-checkbox.component';
import { Router } from '@angular/router';
import { GenericFormComponent } from '../components/generic-form/generic-form.component';

@Component({
  selector: 'app-register-form',
  imports: [
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    DnCheckboxComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent extends GenericFormComponent {
  registerData: RegisterDto = new RegisterDto();
  logoPath: string;
  isLoading: boolean = false;
  generalOptionsViewModel: GeneralOptionsViewModel;
  isRegistrationCompleted: boolean;
  registerForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    super()
    this.logoPath = './assets/images/datanex_logo.png';
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      ClientName: ['', Validators.required],
      ClientAddress: ['', Validators.required],
      ClientPostalCode: ['', Validators.required],
      ClientCity: ['', Validators.required],
      ClientCountry: ['', Validators.required],
      ClientPhone1: ['', Validators.required],
      ClientPhone2: [''],
      ClientEmail: ['', [Validators.required,Validators.email]],
      CompanyName: ['', Validators.required],
      CompanyVatNumber: ['', Validators.required],
      CompanyTaxOffice: ['', Validators.required],
      CompanyAddress: ['', Validators.required],
      CompanyPostalCode: ['', Validators.required],
      CompanyCity: ['', Validators.required],
      CompanyCountry: ['', Validators.required],
      CompanyPhone1: ['', Validators.required],
      CompanyPhone2: [''],
      CompanyEmail:  ['', [Validators.required,Validators.email]],
      CompanyLoginCode: ['', Validators.required],
    },{ updateOn: 'change' }
  );
  }

  onSubmitClicked(e: any) {
    if(this.registerForm.valid){
      this.registerData.ClientName = this.registerForm.get('ClientName')?.value
      this.registerData.ClientAddress = this.registerForm.get('ClientAddress')?.value
      this.registerData.ClientPostalCode = this.registerForm.get('ClientPostalCode')?.value
      this.registerData.ClientCity = this.registerForm.get('ClientCity')?.value
      this.registerData.ClientCountry = this.registerForm.get('ClientCountry')?.value
      this.registerData.ClientPhone1 = this.registerForm.get('ClientPhone1')?.value
      this.registerData.ClientPhone2 = this.registerForm.get('ClientPhone2')?.value
      this.registerData.ClientEmail = this.registerForm.get('ClientEmail')?.value

      this.registerData.CompanyName = this.registerForm.get('CompanyName')?.value
      this.registerData.CompanyVatNumber = this.registerForm.get('CompanyVatNumber')?.value
      this.registerData.CompanyTaxOffice = this.registerForm.get('CompanyTaxOffice')?.value
      this.registerData.CompanyAddress = this.registerForm.get('CompanyAddress')?.value
      this.registerData.CompanyPostalCode = this.registerForm.get('CompanyPostalCode')?.value
      this.registerData.CompanyCity = this.registerForm.get('CompanyCity')?.value
      this.registerData.CompanyCountry = this.registerForm.get('CompanyCountry')?.value
      this.registerData.CompanyCountry = this.registerForm.get('CompanyCountry')?.value
      this.registerData.CompanyPhone1 = this.registerForm.get('CompanyPhone1')?.value
      this.registerData.CompanyPhone2 = this.registerForm.get('CompanyPhone2')?.value
      this.registerData.CompanyEmail = this.registerForm.get('CompanyEmail')?.value
      this.registerData.CompanyLoginCode = this.registerForm.get('CompanyLoginCode')?.value

    this.isLoading = true;
    this.auth.register(this.registerData).subscribe({
      next: (result: any) => {
        result as ApiResponseDto;
        if (result?.Success == true) {
          this.isLoading = false;

          this.isRegistrationCompleted = true;
        }
      },
      error: (err) => {
        this.isLoading = false;

        const dialog = this.dialog.open(DnAlertComponent, {
          data: {
            Title: 'Message',
            Message: err.error,
          },
        });
      },
    });
  }else{
    this.markAllAsTouched(this.registerForm)
  }
  }

  onLoginClicked(e: any) {
    debugger
    this.router.navigate(
      ['login'],
      this.isRegistrationCompleted
        ? {
            state: {
              Username: 'admdin',
              Password: 'P@ssw0rd',
              CompanyCode: this.registerData.CompanyLoginCode,
            },
          }
        : {}
    );
  }







}

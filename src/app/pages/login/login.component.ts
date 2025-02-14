import { GeneralOptionsViewModel } from './../../view-models/general-options.viewmodel';
import { CompaniesViewModel } from './../../view-models/companies.viewmodel';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  isDevMode,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../dto/login.dto';
import { Router } from '@angular/router';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { WebAppBase } from '../../base/web-app-base';
import { ApiResponseDto } from '../../dto/api-response.dto';
import { UserDto } from '../../dto/user.dto';
import { HttpClient } from '@angular/common/http';
import { GeneralOptionsDto } from '../../dto/configuration/general-options.dto';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  loginData: LoginDto = new LoginDto();
  logoPath: string;
  isLoading: boolean = false;
  //companiesViewModel: CompaniesViewModel;
  //companies: any;
  generalOptionsViewModel: GeneralOptionsViewModel;
  loginForm: FormGroup;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    //When someone navigates from register to login
    this.loginData.UserName = history.state?.Username;
    this.loginData.Password = history.state?.Password;
    this.loginData.CompanyCode = history.state?.CompanyCode;

    this.logoPath = './assets/images/datanex_logo.png';

    this.initializeForm()
  }

  ngAfterViewInit() {
    // Check if there are autofilled values
    setTimeout(() => {
      const userName = this.loginForm.get('userName');
      const password = this.loginForm.get('password');
      const companyCode = this.loginForm.get('companyCode');
      const userNameValue = (<HTMLInputElement>(
        document.getElementById('userName')
      ))?.value;
      const passwordValue = (<HTMLInputElement>(
        document.getElementById('password')
      ))?.value;
      const companyCodeValue = (<HTMLInputElement>(
        document.getElementById('companyCode')
      ))?.value;

      if (userNameValue) {
        userName!.setValue(userNameValue);
      }

      if (passwordValue) {
        password!.setValue(passwordValue);
      }

      if (companyCodeValue) {
        companyCode!.setValue(companyCodeValue);
      }
    }, 500);
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
      companyCode: ['', [Validators.required]],
    });
  }

  onSubmitClicked(e: any) {
    this.loginData.UserName = this.loginForm.get('userName')?.value;
    this.loginData.Password = this.loginForm.get('password')?.value;
    this.loginData.CompanyCode = this.loginForm.get('companyCode')?.value;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.auth.login(this.loginData).subscribe({
        next: (result: any) => {
          result as ApiResponseDto;
          if (result?.Success == true) {
            let user = result.Result as UserDto;
            this.auth.isAuthenticated = true;
            this.auth.loggedInCompany = user.Company;
            WebAppBase.isLoggedIn = true;
            this.auth.user = user;
            this.ref.detectChanges();
            this.router.navigate(['/']);
            this.generalOptionsViewModel = new GeneralOptionsViewModel(
              this.http,
              this.auth
            );
            this.generalOptionsViewModel
              .GetAll()
              .subscribe((result: GeneralOptionsDto) => {
                this.auth.appOptions = result;
              });
          } else {
            WebAppBase.isLoggedIn = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
          const dialog = this.dialog.open(DnAlertComponent, {
            data: {
              Title: 'Message',
              Message:
                err.status == 0
                  ? 'It seems there is a network issue. Please check your internet connection'
                  : err.error,
            },
          });
        },
      });
    } else {
      this.markAllAsTouched();
    }
  }

  markAllAsTouched() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.controls[key].markAsTouched();
    });
  }

  isTouchedOrInvalid(field: string) {
    return (
      this.loginForm.get(field)!.touched && this.loginForm.get(field)!.invalid
    );
  }
}

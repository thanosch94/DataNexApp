import { GeneralOptionsViewModel } from './../../view-models/general-options.viewmodel';
import { CompaniesViewModel } from './../../view-models/companies.viewmodel';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
        FormsModule,
        MatInputModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginDto = new LoginDto();
  logoPath: string;
  isLoading: boolean =false;
  companiesViewModel: CompaniesViewModel;
  companies: any;
  generalOptionsViewModel: GeneralOptionsViewModel;

  constructor(
    private http:HttpClient,
    private auth: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
      this.logoPath = "./assets/images/datanex_logo.png"
    this.companiesViewModel = new CompaniesViewModel(this.http,this.auth)
    this.companiesViewModel.GetLookup().subscribe((result:any)=>{
      this.companies = result
      this.loginData.CompanyId=this.companies[0].Id
    })
  }

  onSubmitClicked(e: any) {
    this.isLoading =true
    this.auth.login(this.loginData).subscribe({
      next: (result: any) => {
        result as ApiResponseDto
        if (result?.Success == true) {
          let user = result.Result as UserDto
          this.auth.isAuthenticated = true;
          this.companiesViewModel.GetById(this.loginData.CompanyId).subscribe((result:any)=>{
            this.auth.loggedInCompany = result
            WebAppBase.isLoggedIn =true;
            this.auth.user=user;
            this.ref.detectChanges();
            this.router.navigate(['/']);
            this.generalOptionsViewModel = new GeneralOptionsViewModel(this.http,this.auth)
            this.generalOptionsViewModel.GetAll().subscribe((result:GeneralOptionsDto)=>{
              this.auth.appOptions = result
            })
          })


        } else {
          WebAppBase.isLoggedIn =false;

        }
      },
      error: (err) => {
        this.isLoading =false

        const dialog = this.dialog.open(DnAlertComponent, {
          data: {
            Title: 'Message',
            Message: err.error,
          },
        });
      },
    });
  }
}

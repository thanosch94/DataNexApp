import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { AccountViewModel as AccountViewModel } from '../view-models/account.viewmodel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';
import { environment } from '../../environments/environment';
import { Guid } from 'guid-typescript';
import { CompanyDto } from '../dto/company.dto';
import { GeneralOptionsDto } from '../dto/configuration/general-options.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accountViewModel: AccountViewModel;
  isAuthenticated: boolean = false;
  appOptions:GeneralOptionsDto

  loggedInCompany:CompanyDto
  private _user: UserDto;

  private token: string | undefined;
  headers: any;
  public get user(): UserDto {
    return this._user;
  }
  public set user(v: UserDto) {
    this._user = v;
    this.token = v.Token;
    this.getHeaders()
  }

  getHeaders() {
    this.headers = {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'CompanyId':this.loggedInCompany?.Id,
      'CompanyCode':this.loggedInCompany?.CompanyLoginCode
    };
    return this.headers;
  }
  constructor() {
  }

  login(loginData: LoginDto): Observable<Object> {
    let http = new HttpClient(
      new HttpXhrBackend({
        build: () => new XMLHttpRequest(),
      })
    );

    this.accountViewModel = new AccountViewModel(http);

    return this.accountViewModel.Login(loginData);
  }

  register(registerData: RegisterDto): Observable<Object> {
    let http = new HttpClient(
      new HttpXhrBackend({
        build: () => new XMLHttpRequest(),
      })
    );

    this.accountViewModel = new AccountViewModel(http);

    return this.accountViewModel.Register(registerData);
  }

  getApiService() {
    let serviceUrl = environment.apiUrl
    return serviceUrl;
  }
}

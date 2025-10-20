import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';
import { environment } from '../../environments/environment';
import { CompanyDto } from '../dto/company.dto';
import { GeneralOptionsDto } from '../dto/configuration/general-options.dto';
import { RegisterDto } from '../dto/register.dto';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  appOptions:GeneralOptionsDto
  accountService = inject(AccountService)
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
    return this.accountService.Login(loginData);
  }

  register(registerData: RegisterDto): Observable<Object> {
    let http = new HttpClient(
      new HttpXhrBackend({
        build: () => new XMLHttpRequest(),
      })
    );
    return this.accountService.Register(registerData);
  }

  getApiService() {
    let serviceUrl = environment.apiUrl
    return serviceUrl;
  }
}

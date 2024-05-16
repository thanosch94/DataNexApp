import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AccountViewModel as AccountViewModel } from './../view-models/login.viewmodel';
import { Component, Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  accountViewModel: AccountViewModel;
  isAuthenticated: boolean = false;

  private _user : UserDto;
  public get user() : UserDto {
    return this._user;
  }
  public set user(v : UserDto) {
    this._user = v;
  }

  constructor(private http:HttpClient) {
    this.accountViewModel = new AccountViewModel(this.http)

  }

  login(loginData:LoginDto):Observable<Object>{
    return this.accountViewModel.Login(loginData)
  }


  getApiService(){
    // let serviceUrl = 'http://20.107.178.104/DataNexApi/api/'
    let serviceUrl = 'http://localhost:5000/api/'
    return serviceUrl
  }
}

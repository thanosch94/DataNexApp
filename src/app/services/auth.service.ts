import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginViewModel } from './../view-models/login.viewmodel';
import { Component, Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  loginViewModel: LoginViewModel;
  isAuthenticated: boolean = false;

  constructor(private http:HttpClient) {
    debugger
    this.loginViewModel = new LoginViewModel(this.http)

  }

  login(loginData:LoginDto):Observable<Object>{
    return this.loginViewModel.Login(loginData)
  }
}

import { HttpClient } from "@angular/common/http";
import { LoginDto } from "../dto/login.dto";
import { environment } from "../../environments/environment";
import { RegisterDto } from "../dto/register.dto";

export class AccountViewModel {
  service: string;
  userTimeZone: number;
  constructor(private http: HttpClient) {
    this.service = environment.apiUrl
    this.userTimeZone =new Date().getTimezoneOffset()
  }

  public Login(loginData:LoginDto) {
    let headers = {
      'Content-Type': 'application/json',
      'TimeZoneOffset':this.userTimeZone.toString()

    };

    return this.http.post(this.service + 'account/login',loginData,{
      headers: headers,
    });
  }

  public Register(registerData:RegisterDto) {
    let headers = {
      'Content-Type': 'application/json',
      'TimeZoneOffset':this.userTimeZone.toString()

    };

    return this.http.post(this.service + 'account/register',registerData,{
      headers: headers,
    });
  }
}

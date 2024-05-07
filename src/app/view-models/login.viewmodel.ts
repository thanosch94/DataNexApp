import { HttpClient } from "@angular/common/http";
import { LoginDto } from "../dto/login.dto";

export class LoginViewModel {
  service: string;
  constructor(private http: HttpClient) {
    this.service = 'http://20.107.178.104/DataNexApi/api/';  }

  public Login(loginData:LoginDto) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post(this.service + 'login/login',loginData,{
      headers: headers,
    });
  }
}

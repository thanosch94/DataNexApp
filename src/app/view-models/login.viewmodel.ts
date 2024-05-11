import { HttpClient } from "@angular/common/http";
import { LoginDto } from "../dto/login.dto";
import { AuthService } from "../services/auth.service";

export class AccountViewModel {
  service: string;
  constructor(private http: HttpClient) {
    this.service = 'http://20.107.178.104/DataNexApi/api/'
    this.service = 'http://localhost:5000/api/'

  }

  public Login(loginData:LoginDto) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post(this.service + 'account/login',loginData,{
      headers: headers,
    });
  }
}

import { HttpClient } from "@angular/common/http";
import { LoginDto } from "../dto/login.dto";
import { AuthService } from "../services/auth.service";
import { environment } from "../../environments/environment";

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
}

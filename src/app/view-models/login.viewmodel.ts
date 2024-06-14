import { HttpClient } from "@angular/common/http";
import { LoginDto } from "../dto/login.dto";
import { AuthService } from "../services/auth.service";
import { environment } from "../../environments/environment";

export class AccountViewModel {
  service: string;
  constructor(private http: HttpClient) {
    this.service = environment.apiUrl

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

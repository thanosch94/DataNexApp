import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";

export class LogsViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {

    return this.http.get(this.service + 'Logs/getall', {
      headers: this.headers,
    });
  }

}

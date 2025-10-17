import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LogDto } from '../dto/log.dto';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
 service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get<LogDto[]>(this.service + 'Logs/getall', {
      headers: this.auth.headers,
    });
  }
}

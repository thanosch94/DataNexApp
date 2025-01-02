import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetOrdersByStatus() {
    return this.http.get(this.service + 'Reports/getOrdersByStatus', {
      headers: this.auth.headers,
    });
  }
  public GetAverageOrderPerMonth() {
    return this.http.get(this.service + 'Reports/getAverageOrderPerMonth', {
      headers: this.auth.headers,
    });
  }
  public GetOrdersTotalPerMonth() {
    return this.http.get(this.service + 'Reports/getOrdersTotalPerMonth', {
      headers: this.auth.headers,
    });
  }
}

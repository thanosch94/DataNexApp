import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { CustomerDto } from './../dto/customer.dto';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get(this.service + 'Customers/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id:Guid) {

    return this.http.get(this.service + 'Customers/getbyid/'+id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(customer: CustomerDto) {
    return this.http.post(this.service + 'Customers/insertdto', customer, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(customer: CustomerDto) {
    return this.http.put(this.service + 'Customers/updatedto', customer, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'Customers/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

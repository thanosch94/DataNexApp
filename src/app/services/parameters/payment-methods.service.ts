import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { PaymentMethodDto } from '../../dto/payment-method.dto';
import { Guid } from 'guid-typescript';

type T = PaymentMethodDto;

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {
  service: string;

  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get<T[]>(this.service + 'PaymentMethods/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get<T>(this.service + 'PaymentMethods/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(dto: T) {
    return this.http.post<T>(this.service + 'PaymentMethods/insertdto', dto, {
      headers: this.auth.headers,
    });
  }
  public UpdateDto(dto: T) {
    return this.http.put<T>(this.service + 'PaymentMethods/updatedto', dto, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete<T>(this.service + 'PaymentMethods/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

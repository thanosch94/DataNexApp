import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Guid } from 'guid-typescript';
import { ShippingMethodDto } from '../../dto/shipping-method.dto';

type T = ShippingMethodDto;

@Injectable({
  providedIn: 'root'
})
export class ShippingMethodsService {
  service: string;

  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get<T[]>(this.service + 'ShippingMethods/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get<T>(this.service + 'ShippingMethods/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(dto: T) {
    return this.http.post<T>(this.service + 'ShippingMethods/insertdto', dto, {
      headers: this.auth.headers,
    });
  }
  public UpdateDto(dto: T) {
    return this.http.put<T>(this.service + 'ShippingMethods/updatedto', dto, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete<T>(this.service + 'ShippingMethods/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

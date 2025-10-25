import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProductSizeDto } from '../../dto/product-size.dto';
import { Guid } from 'guid-typescript';

type T = ProductSizeDto;

@Injectable({
  providedIn: 'root'
})
export class ProductSizesService {
  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();

  }

  public GetAll() {
    return this.http.get<T[]>(this.service + 'ProductSizes/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get<T>(this.service + 'ProductSizes/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }
  public GetBySku(sku: string) {
    return this.http.get<T[]>(this.service + 'ProductSizes/getbysku/' + sku, {
      headers: this.auth.headers,
    });
  }


  public InsertDto(product: T) {
    return this.http.post<T>(this.service + 'ProductSizes/insertdto', product, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(product: T) {
    return this.http.put<T>(this.service + 'ProductSizes/updatedto', product, {
      headers: this.auth.headers,
    });

  }
  public DeleteById(id: Guid) {
    return this.http.delete<T>(this.service + 'ProductSizes/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }

}

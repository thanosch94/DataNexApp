import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ProductDto } from '../dto/product.dto';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get<ProductDto[]>(this.service + 'Products/getall', {
      headers: this.auth.headers,
    });
  }

  public GetLookup() {
    return this.http.get<ProductDto[]>(this.service + 'Products/getlookup', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get<ProductDto>(this.service + 'Products/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }
  public GetBySku(sku: string) {
    return this.http.get<ProductDto>(this.service + 'Products/getbysku/' + sku, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(product: ProductDto) {
    return this.http.post<ProductDto>(this.service + 'Products/insertdto', product, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(product: ProductDto) {
    return this.http.put<ProductDto>(this.service + 'Products/updatedto', product, {
      headers: this.auth.headers,
    });

  }
  public DeleteById(id: Guid) {
    return this.http.delete<ProductDto>(this.service + 'Products/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }

}

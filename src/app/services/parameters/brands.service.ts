import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Guid } from 'guid-typescript';
import { BrandDto } from '../../dto/brand.dto';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();

  }

  public GetAll() {
    return this.http.get(this.service + 'Brands/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {

    return this.http.get(this.service + 'Brands/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(brand: BrandDto) {

    return this.http.post(this.service + 'Brands/insertdto', brand, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(brand: BrandDto) {

    return this.http.put(this.service + 'Brands/updatedto', brand, {
      headers: this.auth.headers,
    });

  }
  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'Brands/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

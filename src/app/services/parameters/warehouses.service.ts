import { Injectable } from '@angular/core';
import { WarehouseDto } from '../../dto/inventory/warehouse.dto';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

type T = WarehouseDto

@Injectable({
  providedIn: 'root',
})

export class WarehousesService {
  service: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get<T[]>(this.service + 'Warehouses/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get<T>(this.service + 'Warehouses/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(dto: T) {
    return this.http.post<T>(this.service + 'Warehouses/insertdto', dto, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(dto: T) {
    return this.http.put<T>(this.service + 'Warehouses/updatedto', dto, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete<T>(this.service + 'Warehouses/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

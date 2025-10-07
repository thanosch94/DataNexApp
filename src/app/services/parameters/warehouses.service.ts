import { Injectable } from '@angular/core';
import { WarehouseDto } from '../../dto/inventory/warehouse.dto';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

type EntityType = WarehouseDto

@Injectable({
  providedIn: 'root',
})

export class WarehousesService {
  service: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get<EntityType[]>(this.service + 'Warehouses/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get<EntityType>(this.service + 'Warehouses/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(dto: EntityType) {
    return this.http.post<EntityType>(this.service + 'Warehouses/insertdto', dto, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(dto: EntityType) {
    return this.http.put<EntityType>(this.service + 'Warehouses/updatedto', dto, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete<EntityType>(this.service + 'Warehouses/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

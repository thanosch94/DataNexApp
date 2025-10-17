import { Injectable } from '@angular/core';
import { WooConnectionsDataDto } from '../../dto/woo-connections-data.dto';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

type T = WooConnectionsDataDto

@Injectable({
  providedIn: 'root'
})
export class WooConnectionsService {
service: string;

  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();

  }

  public GetAll() {
    return this.http.get<T[]>(this.service + 'WooConnections/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get<T>(this.service + 'WooConnections/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(dto:T) {
    return this.http.post<T>(this.service + 'WooConnections/insertdto', dto, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(dto:T) {
    return this.http.put<T>(this.service + 'WooConnections/updatedto', dto, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete<T>(this.service + 'WooConnections/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

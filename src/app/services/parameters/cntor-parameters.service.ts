import { Injectable } from '@angular/core';
import { ConnectorParametersDto } from '../../dto/connector-parameters.dto';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Guid } from 'guid-typescript';

type T = ConnectorParametersDto;
@Injectable({
  providedIn: 'root'
})
export class CntorParametersService {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get<T[]>(this.service + 'ConnectorParameters/getall', {
      headers: this.auth.headers,
    });
  }

  public InsertDto(dto: T) {
    return this.http.post<T>(this.service + 'ConnectorParameters/insertdto', dto, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(dto: T) {
    return this.http.put<T>(this.service + 'ConnectorParameters/updatedto', dto, {
      headers: this.auth.headers,
    });

  }
  public DeleteById(id: Guid) {
    return this.http.delete<T>(this.service + 'ConnectorParameters/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

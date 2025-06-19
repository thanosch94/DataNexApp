import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Guid } from 'guid-typescript';
import { CntorDatasourceDto } from '../../dto/configuration/cntor-datasource.dto';

@Injectable({
  providedIn: 'root'
})
export class CntorDatasourcesService {
 service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();

  }

  public GetAll() {
    return this.http.get(this.service + 'CntorDatasources/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {

    return this.http.get(this.service + 'CntorDatasources/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(cntorDatasource: CntorDatasourceDto) {

    return this.http.post(this.service + 'CntorDatasources/insertdto', cntorDatasource, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(cntorDatasource: CntorDatasourceDto) {

    return this.http.put(this.service + 'CntorDatasources/updatedto', cntorDatasource, {
      headers: this.auth.headers,
    });

  }
  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'CntorDatasources/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

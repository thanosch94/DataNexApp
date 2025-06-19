import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Guid } from 'guid-typescript';
import { CntorDatasourceEntityDto } from '../../dto/configuration/cntor-datasource-entity.dto';

@Injectable({
  providedIn: 'root'
})
export class CntorDatasourceEntitiesService {
service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();

  }

  public GetAll() {
    return this.http.get(this.service + 'CntorDatasourceEntities/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'CntorDatasourceEntities/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }
  public GetCntorDatasourceEntitiesByDataSourceId(datasourceId: Guid) {
    return this.http.get(this.service + 'CntorDatasourceEntities/getbydatasourceid/' + datasourceId, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(cntorDatasource: CntorDatasourceEntityDto) {

    return this.http.post(this.service + 'CntorDatasourceEntities/insertdto', cntorDatasource, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(cntorDatasource: CntorDatasourceEntityDto) {

    return this.http.put(this.service + 'CntorDatasourceEntities/updatedto', cntorDatasource, {
      headers: this.auth.headers,
    });

  }
  public DeleteById(id: Guid) {
    debugger
    return this.http.delete(this.service + 'CntorDatasourceEntities/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}


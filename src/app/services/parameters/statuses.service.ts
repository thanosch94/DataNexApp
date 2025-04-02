import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { StatusDto } from '../../dto/status.dto';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { StatusTypeEnum } from '../../enums/status-type.enum';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {

service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get(this.service + 'Statuses/getall', {
      headers: this.auth.headers,
    });
  }
  public GetAllStatusesByStatusType(statusType:StatusTypeEnum) {

    return this.http.get(this.service + 'Statuses/getallByStatusType/'+statusType, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(status: StatusDto) {
    return this.http.post(this.service + 'Statuses/insertdto', status, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(status: StatusDto) {
    return this.http.put(this.service + 'Statuses/updatedto', status, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'Statuses/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

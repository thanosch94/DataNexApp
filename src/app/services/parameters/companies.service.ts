import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { CompanyDto } from '../../dto/company.dto';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  public GetAll() {

    return this.http.get(this.service + 'Companies/getall', {
      headers: this.auth.headers,
    });
  }

  public GetLookup() {

    return this.http.get(this.service + 'Companies/getlookup', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {

    return this.http.get(this.service + 'Companies/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(dto: CompanyDto) {

    return this.http.post(this.service + 'Companies/insertdto', dto, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(dto: CompanyDto) {

    return this.http.put(this.service + 'Companies/updatedto', dto, {
      headers: this.auth.headers,
    });

  }
  public DeleteById(id: Guid) {

    return this.http.delete(this.service + 'Companies/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }

}

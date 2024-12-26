import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Guid } from 'guid-typescript';
import { VatClassDto } from '../../dto/vat-class.dto';

@Injectable({
  providedIn: 'root'
})
export class VatClassesService {
  service: string;

  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get(this.service + 'VatClasses/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'VatClasses/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(dto: VatClassDto) {
    return this.http.post(this.service + 'VatClasses/insertdto', dto, {
      headers: this.auth.headers,
    });
  }
  public UpdateDto(dto: VatClassDto) {
    return this.http.put(this.service + 'VatClasses/updatedto', dto, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'VatClasses/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

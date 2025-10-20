import { Injectable } from '@angular/core';
import { GeneralOptionsDto } from '../../dto/configuration/general-options.dto';
import { Guid } from 'guid-typescript';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

type T = GeneralOptionsDto

@Injectable({
  providedIn: 'root'
})
export class GeneralOptionsService {
  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get<T[]>(this.service + 'GeneralOptions/getall', {
      headers: this.auth.headers,
    });
  }

  public InsertDto(options: T) {
    return this.http.post<T>(this.service + 'GeneralOptions/insertdto', options, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(options: T) {
    return this.http.put<T>(this.service + 'GeneralOptions/updatedto', options, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete<T>(this.service + 'GeneralOptions/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { LotSettingsDto } from '../../dto/configuration/lot-settings.dto';
import { Guid } from 'guid-typescript';

type T = LotSettingsDto;
@Injectable({
  providedIn: 'root'
})
export class LotSettingsService {
service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get<T[]>(this.service + 'LotSettings/getall', {
      headers: this.auth.headers,
    });
  }

  public InsertDto(lot: T) {
    return this.http.post<T>(this.service + 'LotSettings/insertdto', lot, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(lot: T) {
    return this.http.put<T>(this.service + 'LotSettings/updatedto', lot, {
      headers: this.auth.headers,
    });

  }
  public DeleteById(id: Guid) {
    return this.http.delete<T>(this.service + 'LotSettings/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

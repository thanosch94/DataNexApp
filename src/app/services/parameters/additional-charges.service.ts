import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { AdditionalChargeDto } from '../../dto/additional-charge.dto';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdditionalChargesService {
  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();

  }

  public GetAll() {
    return this.http.get(this.service + 'AdditionalCharges/getall', {
      headers: this.auth.headers,
    });
  }

  public InsertDto(additionalChargeDto: AdditionalChargeDto) {
    return this.http.post(this.service + 'AdditionalCharges/insertdto', additionalChargeDto, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(additionalChargeDto: AdditionalChargeDto) {
    return this.http.put(this.service + 'AdditionalCharges/updatedto', additionalChargeDto, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'AdditionalCharges/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

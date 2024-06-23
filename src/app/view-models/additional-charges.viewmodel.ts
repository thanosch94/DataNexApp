import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Guid } from "guid-typescript";
import { AdditionalChargeDto } from "../dto/additional-charge.dto";

export class AdditionalChargesViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'AdditionalCharges/getall', {
      headers: this.headers,
    });
  }

  public InsertDto(additionalChargeDto: AdditionalChargeDto) {
    return this.http.post(this.service + 'AdditionalCharges/insertdto', additionalChargeDto, {
      headers: this.headers,
    });
  }

  public UpdateDto(additionalChargeDto: AdditionalChargeDto) {
    return this.http.put(this.service + 'AdditionalCharges/updatedto', additionalChargeDto, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'AdditionalCharges/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

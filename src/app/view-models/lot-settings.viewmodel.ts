import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { LotSettingsDto } from "../dto/configuration/lot-settings.dto";

export class LotSettingsViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get<LotSettingsDto>(this.service + 'LotSettings/getall', {
      headers: this.headers,
    });
  }

  public InsertDto(lot: LotSettingsDto) {
    return this.http.post<LotSettingsDto>(this.service + 'LotSettings/insertdto', lot, {
      headers: this.headers,
    });
  }

  public UpdateDto(lot: LotSettingsDto) {
    return this.http.put<LotSettingsDto>(this.service + 'LotSettings/updatedto', lot, {
      headers: this.headers,
    });

  }
  public DeleteById(id: LotSettingsDto) {
    return this.http.delete<LotSettingsDto>(this.service + 'LotSettings/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

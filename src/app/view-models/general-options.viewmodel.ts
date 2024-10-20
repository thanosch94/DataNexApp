import { GeneralOptionsDto } from '../dto/configuration/general-options.dto';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Guid } from 'guid-typescript';

export class GeneralOptionsViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get<GeneralOptionsDto>(this.service + 'GeneralOptions/getall', {
      headers: this.headers,
    });
  }


  public InsertDto(options: GeneralOptionsDto) {
    return this.http.post<GeneralOptionsDto>(this.service + 'GeneralOptions/insertdto', options, {
      headers: this.headers,
    });
  }

  public UpdateDto(options: GeneralOptionsDto) {
    return this.http.put<GeneralOptionsDto>(this.service + 'GeneralOptions/updatedto', options, {
      headers: this.headers,
    });

  }
  public DeleteById(id: Guid) {
    return this.http.delete<GeneralOptionsDto>(this.service + 'GeneralOptions/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

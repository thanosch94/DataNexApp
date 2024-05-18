import { StatusDto } from './../dto/status.dto';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { AuthService } from '../services/auth.service';

export class StatusesViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'Statuses/getall', {
      headers: this.headers,
    });
  }



  public InsertDto(status: StatusDto) {
    return this.http.post(this.service + 'Statuses/insertdto', status, {
      headers: this.headers,
    });
  }

  public UpdateDto(status: StatusDto) {
    return this.http.put(this.service + 'Statuses/updatedto', status, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'Statuses/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

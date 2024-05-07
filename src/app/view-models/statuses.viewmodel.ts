import { StatusDto } from './../dto/status.dto';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { AuthService } from '../services/auth.service';

export class StatusesViewModel {
  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'Statuses/getall', {
      headers: headers,
    });
  }



  public InsertDto(status: StatusDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.service + 'Statuses/insertdto', status, {
      headers: headers,
    });
  }

  public UpdateDto(status: StatusDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(this.service + 'Statuses/updatedto', status, {
      headers: headers,
    });
  }

  public DeleteById(id: Guid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(this.service + 'Statuses/deletebyid/' + id, {
      headers: headers,
    });
  }
}

import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Guid } from "guid-typescript";
import { WooConnectionsDataDto } from "../dto/woo-connections-data.dto";

export class WooConnectionsViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'WooConnections/getall', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'WooConnections/getbyid/' + id, {
      headers: this.headers,
    });
  }

  public InsertDto(wooConnection:WooConnectionsDataDto) {
    return this.http.post(this.service + 'WooConnections/insertdto', wooConnection, {
      headers: this.headers,
    });
  }
  public UpdateDto(wooConnection:WooConnectionsDataDto) {
    return this.http.put(this.service + 'WooConnections/updatedto', wooConnection, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'WooConnections/deletebyid/' + id, {
      headers: this.headers,
    });
  }

}

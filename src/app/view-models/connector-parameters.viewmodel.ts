import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { ConnectorParametersDto } from "../dto/connector-parameters.dto";
import { Guid } from "guid-typescript";

export class ConnectorParametersViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'ConnectorParameters/getall', {
      headers: this.headers,
    });
  }

  public InsertDto(connectorParameters: ConnectorParametersDto) {
    return this.http.post(this.service + 'ConnectorParameters/insertdto', connectorParameters, {
      headers: this.headers,
    });
  }

  public UpdateDto(connectorParameters: ConnectorParametersDto) {
    return this.http.put(this.service + 'ConnectorParameters/updatedto', connectorParameters, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'ConnectorParameters/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

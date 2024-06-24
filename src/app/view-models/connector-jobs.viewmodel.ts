import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Guid } from "guid-typescript";
import { ConnectorJobDto } from "../dto/connector-job.dto";
import { ConnectorJobTypeEnum } from "../enums/connector-job-type.enum";

export class ConnectorJobsViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'ConnectorJobs/getall', {
      headers: this.headers,
    });
  }

  public GetAllByDataSourceId(id:Guid) {
    return this.http.get(this.service + 'ConnectorJobs/getallbydatasourceid/'+id, {
      headers: this.headers,
    });
  }

  public GetAllByJobType(jobType:ConnectorJobTypeEnum) {
    return this.http.get(this.service + 'ConnectorJobs/getallbyjobtype/'+jobType, {
      headers: this.headers,
    });
  }

  public GetById(id:Guid) {
    return this.http.get(this.service + 'ConnectorJobs/getbyid/'+id, {
      headers: this.headers,
    });
  }

  public InsertDto(connectorJob: ConnectorJobDto) {
    return this.http.post(this.service + 'ConnectorJobs/insertdto', connectorJob, {
      headers: this.headers,
    });
  }

  public UpdateDto(connectorJob: ConnectorJobDto) {
    return this.http.put(this.service + 'ConnectorJobs/updatedto', connectorJob, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'ConnectorJobs/deletebyid/' + id, {
      headers: this.headers,
    });
  }

}


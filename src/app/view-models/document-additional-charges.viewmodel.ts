import { DocumentAdditionalChargeDto } from './../dto/document-additional-charge.dto';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Guid } from "guid-typescript";

export class DocumentAdditionalChargesViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'DocumentAdditionalCharges/getall', {
      headers: this.headers,
    });
  }

  public GetByDocumentId(id:Guid) {
    return this.http.get(this.service + 'DocumentAdditionalCharges/getbydocumentid/'+id, {
      headers: this.headers,
    });
  }

  public InsertDto(documentAdditionalChargeDto: DocumentAdditionalChargeDto) {
    return this.http.post(this.service + 'DocumentAdditionalCharges/insertdto', documentAdditionalChargeDto, {
      headers: this.headers,
    });
  }

  public UpdateDto(documentAdditionalChargeDto: DocumentAdditionalChargeDto) {
    return this.http.put(this.service + 'DocumentAdditionalCharges/updatedto', documentAdditionalChargeDto, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'DocumentAdditionalCharges/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

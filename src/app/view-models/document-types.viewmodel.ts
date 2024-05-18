import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { DocumentTypeDto } from "../dto/document-type.dto";
import { AuthService } from "../services/auth.service";

export class DocumentTypesViewModel {

  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {

    return this.http.get(this.service + 'DocumentTypes/getall', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {

    return this.http.get(this.service + 'DocumentTypes/getbyid/' + id, {
      headers: this.headers,
    });
  }

  public InsertDto(documentType: DocumentTypeDto) {

    return this.http.post(this.service + 'DocumentTypes/insertdto', documentType, {
      headers: this.headers,
    });
  }

  public UpdateDto(documentType: DocumentTypeDto) {

    return this.http.put(this.service + 'DocumentTypes/updatedto', documentType, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {

    return this.http.delete(this.service + 'DocumentTypes/deletebyid/' + id, {
      headers: this.headers,
    });
  }

}

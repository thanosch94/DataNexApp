import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { DocumentTypeDto } from "../dto/document-type.dto";
import { AuthService } from "../services/auth.service";

export class DocumentTypesViewModel {

  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'DocumentTypes/getall', {
      headers: headers,
    });
  }

  public GetById(id: Guid) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'DocumentTypes/getbyid/' + id, {
      headers: headers,
    });
  }

  public InsertDto(documentType: DocumentTypeDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.service + 'DocumentTypes/insertdto', documentType, {
      headers: headers,
    });
  }

  public UpdateDto(documentType: DocumentTypeDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(this.service + 'DocumentTypes/updatedto', documentType, {
      headers: headers,
    });
  }

  public DeleteById(id: Guid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(this.service + 'DocumentTypes/deletebyid/' + id, {
      headers: headers,
    });
  }

}

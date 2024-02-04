import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { DocumentDto } from "../dto/document.dto";

export class DocumentsViewModel {

  service: string;
  aadeService: string;
  constructor(private http: HttpClient) {
    this.service = 'http://localhost:5000/api/';
  }

  public GetAll() {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'Documents/getall', {
      headers: headers,
    });
  }

  public GetById(id: Guid) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'Documents/getbyid/' + id, {
      headers: headers,
    });
  }

  public InsertDto(document: DocumentDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.service + 'Documents/insertdto', document, {
      headers: headers,
    });
  }

  public UpdateDto(document: DocumentDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(this.service + 'Documents/updatedto', document, {
      headers: headers,
    });

  }
  public DeleteById(id: Guid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(this.service + 'Documents/deletebyid/' + id, {
      headers: headers,
    });
  }
}

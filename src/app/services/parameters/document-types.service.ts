import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Guid } from 'guid-typescript';
import { DocumentTypeDto } from '../../dto/document-type.dto';
import { DocumentTypeGroupEnum } from '../../enums/document-type-group.enum';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypesService {


  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get(this.service + 'DocumentTypes/getall', {
      headers: this.auth.headers,
    });
  }

  public GetLookup() {
    return this.http.get(this.service + 'DocumentTypes/getLookup', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    debugger
    return this.http.get(this.service + 'DocumentTypes/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }
  public GetActiveDocumentTypesLookupByDocumentTypeGroup(documentTypeGroup: DocumentTypeGroupEnum) {
    return this.http.get(this.service + 'DocumentTypes/getactivedocumenttypeslookupbydocumententity/' + documentTypeGroup, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(documentType: DocumentTypeDto) {
    return this.http.post(this.service + 'DocumentTypes/insertdto', documentType, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(documentType: DocumentTypeDto) {
    return this.http.put(this.service + 'DocumentTypes/updatedto', documentType, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'DocumentTypes/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }


}

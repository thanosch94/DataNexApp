import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { DocumentDto } from '../dto/document.dto';
import { AuthService } from '../services/auth.service';
import { DocumentTypeGroupEnum } from '../enums/document-type-group.enum';

export class DocumentsViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();
  }

  public GetAll() {
    return this.http.get(this.service + 'Documents/getall', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'Documents/getbyid/' + id, {
      headers: this.headers,
    });
  }

  public GetByDocumentGroup(documentTypeGroup: DocumentTypeGroupEnum) {
    return this.http.get(
      this.service + 'Documents/getbydocumenttypegroup/' + documentTypeGroup,
      {
        headers: this.headers,
      }
    );
  }

  public InsertDto(document: DocumentDto) {
    return this.http.post(this.service + 'Documents/insertdto', document, {
      headers: this.headers,
    });
  }

  public UpdateDto(document: DocumentDto) {
    return this.http.put(this.service + 'Documents/updatedto', document, {
      headers: this.headers,
    });
  }
  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'Documents/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

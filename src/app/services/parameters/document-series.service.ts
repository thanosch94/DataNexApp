import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Guid } from 'guid-typescript';
import { DocumentSeriesDto } from '../../dto/configuration/document-series.dto';

@Injectable({
  providedIn: 'root'
})
export class DocumentSeriesService {

  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    return this.http.get<DocumentSeriesDto[]>(this.service + 'DocumentSeries/getall', {
      headers: this.auth.headers,
    });
  }

  public GetLookup() {
    return this.http.get<DocumentSeriesDto[]>(this.service + 'DocumentSeries/getLookup', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get<DocumentSeriesDto>(this.service + 'DocumentSeries/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }

  public GetByDocumentTypeId(id: Guid) {
    debugger
    return this.http.get<DocumentSeriesDto[]>(this.service + 'DocumentSeries/getdocumentseriesbyid/' + id, {
      headers: this.auth.headers,
    });
  }

    public InsertDto(dto: DocumentSeriesDto) {
      return this.http.post<DocumentSeriesDto>(this.service + 'DocumentSeries/insertdto', dto, {
        headers: this.auth.headers,
      });
    }

    public UpdateDto(dto: DocumentSeriesDto) {
      return this.http.put<DocumentSeriesDto>(this.service + 'DocumentSeries/updatedto', dto, {
        headers: this.auth.headers,
      });
    }

    public DeleteById(id: Guid) {
      return this.http.delete<DocumentSeriesDto>(this.service + 'DocumentSeries/deletebyid/' + id, {
        headers: this.auth.headers,
      });
    }
}

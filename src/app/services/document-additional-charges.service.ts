import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { DocumentAdditionalChargeDto } from '../dto/document-additional-charge.dto';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

type T = DocumentAdditionalChargeDto;
@Injectable({
  providedIn: 'root'
})
export class DocumentAdditionalChargesService {
  service: string;
   constructor(private http: HttpClient, private auth:AuthService) {
     this.service = this.auth.getApiService();
   }

   public GetAll() {
     return this.http.get<T[]>(this.service + 'DocumentAdditionalCharges/getall', {
       headers: this.auth.headers,
     });
   }

   public GetByDocumentId(id:Guid) {
     return this.http.get<T[]>(this.service + 'DocumentAdditionalCharges/getbydocumentid/'+id, {
       headers: this.auth.headers,
     });
   }

   public InsertDto(documentAdditionalChargeDto: DocumentAdditionalChargeDto) {
    debugger
     return this.http.post<T>(this.service + 'DocumentAdditionalCharges/insertdto', documentAdditionalChargeDto, {
       headers: this.auth.headers,
     });
   }

   public UpdateDto(documentAdditionalChargeDto: DocumentAdditionalChargeDto) {
     return this.http.put<T>(this.service + 'DocumentAdditionalCharges/updatedto', documentAdditionalChargeDto, {
       headers: this.auth.headers,
     });
   }

   public DeleteById(id: Guid) {
     return this.http.delete<T>(this.service + 'DocumentAdditionalCharges/deletebyid/' + id, {
       headers: this.auth.headers,
     });
   }
}

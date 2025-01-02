//Replaced with service
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Guid } from "guid-typescript";
import { VatClassDto } from "../dto/vat-class.dto";

export class VatClassesViewModel {
  service: string;
  headers: any;

  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'VatClasses/getall', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'VatClasses/getbyid/' + id, {
      headers: this.headers,
    });
  }

  public InsertDto(dto: VatClassDto) {
    return this.http.post(this.service + 'VatClasses/insertdto', dto, {
      headers: this.headers,
    });
  }
  public UpdateDto(dto: VatClassDto) {
    return this.http.put(this.service + 'VatClasses/updatedto', dto, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'VatClasses/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

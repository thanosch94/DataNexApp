import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { SupplierDto } from "../dto/supplier.dto";
import { Guid } from "guid-typescript";

export class SuppliersViewModel {
  service: string;
  headers: any;

  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'Suppliers/getall', {
      headers: this.headers,
    });
  }

  public GetLookup() {
    return this.http.get<SupplierDto[]>(this.service + 'Suppliers/getlookup', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'Suppliers/getbyid/' + id, {
      headers: this.headers,
    });
  }

  public InsertDto(supplier: SupplierDto) {
    return this.http.post(this.service + 'Suppliers/insertdto', supplier, {
      headers: this.headers,
    });
  }

  public UpdateDto(supplier: SupplierDto) {
    return this.http.put(this.service + 'Suppliers/updatedto', supplier, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'Suppliers/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

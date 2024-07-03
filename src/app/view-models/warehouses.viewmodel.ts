import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Guid } from "guid-typescript";
import { WarehouseDto } from "../dto/inventory/warehouse.dto";

export class WarehousesViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'Warehouses/getall', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'Warehouses/getbyid/' + id, {
      headers: this.headers,
    });
  }

  public InsertDto(warehouse:WarehouseDto) {
    return this.http.post(this.service + 'Warehouses/insertdto', warehouse, {
      headers: this.headers,
    });
  }
  public UpdateDto(warehouse:WarehouseDto) {
    return this.http.put(this.service + 'Warehouses/updatedto', warehouse, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'Warehouses/deletebyid/' + id, {
      headers: this.headers,
    });
  }

}

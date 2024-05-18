import { BrandDto } from './../dto/brand.dto';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Guid } from "guid-typescript";

export class BrandsViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {

    return this.http.get(this.service + 'Brands/getall', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {

    return this.http.get(this.service + 'Brands/getbyid/' + id, {
      headers: this.headers,
    });
  }

  public InsertDto(brand: BrandDto) {

    return this.http.post(this.service + 'Brands/insertdto', brand, {
      headers: this.headers,
    });
  }

  public UpdateDto(brand: BrandDto) {

    return this.http.put(this.service + 'Brands/updatedto', brand, {
      headers: this.headers,
    });

  }
  public DeleteById(id: Guid) {

    return this.http.delete(this.service + 'Brands/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

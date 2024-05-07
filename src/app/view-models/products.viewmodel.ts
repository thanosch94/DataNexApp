import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { DocumentProductDto } from "../dto/document-product.dto";
import { ProductDto } from "../dto/product.dto";
import { AuthService } from "../services/auth.service";

export class ProductsViewModel {
  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'Products/getall', {
      headers: headers,
    });
  }

  public GetById(id: Guid) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'Products/getbyid/' + id, {
      headers: headers,
    });
  }
  public GetBySku(sku: string) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'Products/getbysku/' + sku, {
      headers: headers,
    });
  }

  public InsertDto(product: ProductDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.service + 'Products/insertdto', product, {
      headers: headers,
    });
  }

  public UpdateDto(product: ProductDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(this.service + 'Products/updatedto', product, {
      headers: headers,
    });

  }
  public DeleteById(id: Guid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(this.service + 'Products/deletebyid/' + id, {
      headers: headers,
    });
  }
}

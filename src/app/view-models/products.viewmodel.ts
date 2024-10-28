import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { DocumentProductDto } from "../dto/document-product.dto";
import { ProductDto } from "../dto/product.dto";
import { AuthService } from "../services/auth.service";

export class ProductsViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'Products/getall', {
      headers: this.headers,
    });
  }

  public GetLookup() {
    return this.http.get<ProductDto[]>(this.service + 'Products/getlookup', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'Products/getbyid/' + id, {
      headers: this.headers,
    });
  }
  public GetBySku(sku: string) {
    return this.http.get<ProductDto>(this.service + 'Products/getbysku/' + sku, {
      headers: this.headers,
    });
  }

  public InsertDto(product: ProductDto) {
    return this.http.post(this.service + 'Products/insertdto', product, {
      headers: this.headers,
    });
  }

  public UpdateDto(product: ProductDto) {
    return this.http.put(this.service + 'Products/updatedto', product, {
      headers: this.headers,
    });

  }
  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'Products/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

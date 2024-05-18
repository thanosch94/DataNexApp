import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { ProductDto } from "../dto/product.dto";
import { ProductSizeDto } from "../dto/product-size.dto";
import { AuthService } from "../services/auth.service";

export class ProductSizesViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'ProductSizes/getall', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'ProductSizes/getbyid/' + id, {
      headers: this.headers,
    });
  }
  public GetBySku(sku: string) {
    return this.http.get(this.service + 'ProductSizes/getbysku/' + sku, {
      headers: this.headers,
    });
  }


  public InsertDto(product: ProductSizeDto) {
    return this.http.post(this.service + 'ProductSizes/insertdto', product, {
      headers: this.headers,
    });
  }

  public UpdateDto(product: ProductSizeDto) {
    return this.http.put(this.service + 'ProductSizes/updatedto', product, {
      headers: this.headers,
    });

  }
  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'ProductSizes/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

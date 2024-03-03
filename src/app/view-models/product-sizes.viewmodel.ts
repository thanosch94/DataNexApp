import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { ProductDto } from "../dto/product.dto";
import { ProductSizeDto } from "../dto/product-size.dto";

export class ProductSizesViewModel {
  service: string;
  constructor(private http: HttpClient) {
    this.service = 'http://localhost:5000/api/';
  }

  public GetAll() {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'ProductSizes/getall', {
      headers: headers,
    });
  }

  public GetById(id: Guid) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'ProductSizes/getbyid/' + id, {
      headers: headers,
    });
  }
  public GetBySku(sku: string) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'ProductSizes/getbysku/' + sku, {
      headers: headers,
    });
  }


  public InsertDto(product: ProductSizeDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.service + 'ProductSizes/insertdto', product, {
      headers: headers,
    });
  }

  public UpdateDto(product: ProductSizeDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(this.service + 'ProductSizes/updatedto', product, {
      headers: headers,
    });

  }
  public DeleteById(id: Guid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(this.service + 'ProductSizes/deletebyid/' + id, {
      headers: headers,
    });
  }
}

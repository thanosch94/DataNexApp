import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { DocumentProductDto } from "../dto/document-product.dto";

export class DocumentProductsViewModel {
  service: string;
  constructor(private http: HttpClient) {
    this.service = 'http://localhost:5000/api/';
  }

  public GetAll() {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'DocumentProducts/getall', {
      headers: headers,
    });
  }

  public GetById(id: Guid) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'DocumentProducts/getbyid/' + id, {
      headers: headers,
    });
  }
  public GetByDocumentId(id: Guid) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'DocumentProducts/getbydocumentid/' + id, {
      headers: headers,
    });
  }
  public GetPendingOrdersForProductId(productId: Guid) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'DocumentProducts/getpendingordersforproductid/' + productId, {
      headers: headers,
    });
  }

  public GetByBarcode(barcode: string) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'DocumentProducts/getbybarcode/' + barcode, {
      headers: headers,
    });
  }

  public InsertDto(documentProduct: DocumentProductDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.service + 'DocumentProducts/insertdto', documentProduct, {
      headers: headers,
    });
  }

  public UpdateDto(documentProduct: DocumentProductDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(this.service + 'DocumentProducts/updatedto', documentProduct, {
      headers: headers,
    });

  }
  public DeleteById(id: Guid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(this.service + 'DocumentProducts/deletebyid/' + id, {
      headers: headers,
    });
  }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { ProductBarcodeDto } from "../dto/product-barcode.dto";

export class ProductBarcodesViewModel {
  service: string;
  constructor(private http: HttpClient) {
    this.service = 'http://localhost:5000/api/';
  }

  public GetAll() {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'ProductBarcodes/getall', {
      headers: headers,
    });
  }

  public GetById(id: Guid) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'ProductBarcodes/getbyid/' + id, {
      headers: headers,
    });
  }
  public GetByProductId(productid: Guid) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'ProductBarcodes/getbyproductid/' + productid, {
      headers: headers,
    });
  }

  public InsertDto(productBarcode: ProductBarcodeDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.service + 'ProductBarcodes/insertdto', productBarcode, {
      headers: headers,
    });
  }

  public UpdateDto(productBarcode: ProductBarcodeDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(this.service + 'ProductBarcodes/updatedto', productBarcode, {
      headers: headers,
    });

  }
  public DeleteById(id: Guid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(this.service + 'ProductBarcodes/deletebyid/' + id, {
      headers: headers,
    });
  }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { ProductBarcodeDto } from "../dto/product-barcode.dto";
import { AuthService } from "../services/auth.service";

export class ProductBarcodesViewModel {
  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
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

  public GetLookup() {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'ProductBarcodes/getlookup/', {
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

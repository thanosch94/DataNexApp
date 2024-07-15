import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { ProductBarcodeDto } from "../dto/product-barcode.dto";
import { AuthService } from "../services/auth.service";

export class ProductBarcodesViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {

    return this.http.get(this.service + 'ProductBarcodes/getall', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {

    return this.http.get(this.service + 'ProductBarcodes/getbyid/' + id, {
      headers: this.headers,
    });
  }

  public GetLookup() {

    return this.http.get(this.service + 'ProductBarcodes/getlookup/', {
      headers: this.headers,
    });
  }

  public GetByBarcode(barcode: string) {

    return this.http.get<ProductBarcodeDto>(this.service + 'ProductBarcodes/getbybarcode/' + barcode, {
      headers: this.headers,
    });
  }
  public GetByProductId(productid: Guid) {

    return this.http.get<ProductBarcodeDto[]>(this.service + 'ProductBarcodes/getbyproductid/' + productid, {
      headers: this.headers,
    });
  }

  public InsertDto(productBarcode: ProductBarcodeDto) {

    return this.http.post(this.service + 'ProductBarcodes/insertdto', productBarcode, {
      headers: this.headers,
    });
  }

  public UpdateDto(productBarcode: ProductBarcodeDto) {

    return this.http.put(this.service + 'ProductBarcodes/updatedto', productBarcode, {
      headers: this.headers,
    });

  }
  public DeleteById(id: Guid) {

    return this.http.delete(this.service + 'ProductBarcodes/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

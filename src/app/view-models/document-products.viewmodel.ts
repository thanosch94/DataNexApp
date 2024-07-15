import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { DocumentProductDto } from "../dto/document-product.dto";
import { AuthService } from "../services/auth.service";
import { ProductDto } from "../dto/product.dto";
import { ProductBarcodeDto } from "../dto/product-barcode.dto";

export class DocumentProductsViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

    }

  public GetAll() {

    return this.http.get(this.service + 'DocumentProducts/getall', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {

    return this.http.get(this.service + 'DocumentProducts/getbyid/' + id, {
      headers: this.headers,
    });
  }
  public GetByDocumentId(id: Guid) {

    return this.http.get(this.service + 'DocumentProducts/getbydocumentid/' + id, {
      headers: this.headers,
    });
  }
  public GetPendingOrdersForProductId(productId: Guid) {

    return this.http.get(this.service + 'DocumentProducts/getpendingordersforproductid/' + productId, {
      headers: this.headers,
    });
  }



  public InsertDto(documentProduct: DocumentProductDto) {

    return this.http.post(this.service + 'DocumentProducts/insertdto', documentProduct, {
      headers: this.headers,
    });
  }

  public UpdateDto(documentProduct: DocumentProductDto) {

    return this.http.put(this.service + 'DocumentProducts/updatedto', documentProduct, {
      headers: this.headers,
    });

  }
  public DeleteById(id: Guid) {

    return this.http.delete(this.service + 'DocumentProducts/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

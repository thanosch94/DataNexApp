import { HttpClient } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Guid } from "guid-typescript";
import { LotDto } from "../dto/configuration/lot.dto";

export class LotsViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get<Array<LotDto>>(this.service + 'Lots/getall', {
      headers: this.headers,
    });
  }
  public GetLookup() {
    return this.http.get<Array<LotDto>>(this.service + 'Lots/getlookup', {
      headers: this.headers,
    });
  }
  public GetLookupBySupplierId(supplierId:Guid) {
    return this.http.get<Array<LotDto>>(this.service + 'Lots/getlookupbysupplierid/'+ supplierId, {
      headers: this.headers,
    });
  }

  public GetLookupBySupplierIdAndProductId(supplierId:Guid, productId:Guid) {
    return this.http.get<Array<LotDto>>(this.service + 'Lots/getlookupbysupplieridandproductid/'+ supplierId+'/'+productId, {
      headers: this.headers,
    });
  }

  public GetLookupByProductIdWithRemainingQty(productId:Guid) {
    return this.http.get<Array<LotDto>>(this.service + 'Lots/getlookupbyproductidwithremainingqty/'+ productId, {
      headers: this.headers,
    });
  }

  public GetLotQtiesOnSalesDocByProductQtyFIFO(productId: Guid, qty:number) {
    return this.http.get(this.service + 'Lots/getlotqtiesonsalesdocbyproductqtyfifo/'+productId +'/'+ qty, {
      headers: this.headers,
    });
  }
  public GetLotQtiesOnSalesDocByProductQtyLIFO(productId: Guid, qty:number) {
    return this.http.get(this.service + 'Lots/getlotqtiesonsalesdocbyproductqtylifo/'+productId +'/'+ qty, {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get<LotDto>(this.service + 'Lots/getbyid/' + id, {
      headers: this.headers,
    });
  }

  public InsertDto(lot: LotDto) {
    return this.http.post<LotDto>(this.service + 'Lots/insertdto', lot, {
      headers: this.headers,
    });
  }

  public UpdateDto(lot: LotDto) {
    return this.http.put<LotDto>(this.service + 'Lots/updatedto', lot, {
      headers: this.headers,
    });

  }
  public DeleteById(id: Guid) {
    return this.http.delete<LotDto>(this.service + 'Lots/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}

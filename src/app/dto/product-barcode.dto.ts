import { Guid } from "guid-typescript";

export class ProductBarcodeDto {
  Id:Guid;
  ProductId:Guid;
  SizeId:Guid;
  Barcode:string;
  SizeName?:string;
  ProductName?:string;
  IsEditable?:boolean;
  ProductRetailPrice?:number;
  Sku?:string;
  VatClassId?: Guid;
}


import { Guid } from "guid-typescript";

export class ProductBarcodeDto {
  Id:Guid;
  ProductId:Guid;
  SizeId:Guid;
  Barcode:number;
  SizeName?:string;
  IsEditable?:boolean;
  Price?:number;
}

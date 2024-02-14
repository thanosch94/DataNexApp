import { Guid } from "guid-typescript";

export class DocumentProductDto {
  Id:Guid;
  DocumentId:Guid;
  ProductId:Guid;
  ProductQuantity:number;
  ProductSizeId:Guid;
  SerialNumber?:number;

  Sku:string;
  ProductName:string;
  DocumentNumber:string
  SizeAbbreviation:string;
}

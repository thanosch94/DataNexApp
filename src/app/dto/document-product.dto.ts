import { Guid } from "guid-typescript";

export class DocumentProductDto {
  Id:Guid;
  DocumentId:Guid;
  ProductId:Guid;
  Quantity?:number;
  ProductSizeId:Guid;
  SerialNumber?:number;
  Price?:number;

  Sku:string;
  ProductName?:string;
  DocumentNumber:string
  SizeName:string;
  Barcode?: string;
  TotalPrice?:number;
  IsRowFilled:boolean =false;
  ProductNameCopy?: string;
  BarcodeCopy?: string;
}

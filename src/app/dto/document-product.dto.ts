import { Guid } from "guid-typescript";

export class DocumentProductDto {
  Id:Guid;
  DocumentId:Guid;
  ProductId:Guid;
  Quantity?:number;
  SizeId:Guid;
  SerialNumber?:number;
  ProductRetailPrice?:number;
  VatAmount?:number;
  TotalVatAmount:number;

  Sku?:string;
  DocumentDateString:string;
  DocumentDate:Date|string;
  ProductName?:string;
  DocumentNumber:string;
  DocumentCode:string;
  SizeName?:string;
  Barcode?: string;
  TotalPrice?:number;
  IsRowFilled:boolean =false;
  ProductNameCopy?: string;
  BarcodeCopy?: string;
  VatClassRate: any;
  VatClassId: any;
  IsEditable: boolean;
}

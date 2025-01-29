import { Guid } from "guid-typescript";
import { DocumentProductLotQuantityDto } from "./document-product-lot-quantity.dto";

export class DocumentProductDto {
  Id:Guid;
  SerialNumber?:number;
  Code?:string;
  DocumentId:Guid;
  ProductId:Guid;
  Quantity?:number;
  ProductSizeId:Guid;
  ProductRetailPrice?:number;
  VatAmount?:number;
  TotalVatAmount:number;
  DocumentProductLotsQuantities:DocumentProductLotQuantityDto[];

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
  QuantityFromLots: number; //Used to store the total quantity from lots
  ProductRetailPriceCopy: number | undefined;

}

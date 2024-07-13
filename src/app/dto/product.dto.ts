import { Guid } from "guid-typescript";

export class ProductDto {
  Id: Guid;
  Sku?: string;
  Name: string;
  Description?: string;
  ImagePath?: string;
  RetailPrice?: number;
  WholesalePrice?: number;
  VatClassId: Guid;
  BrandId: Guid;
  BrandName: string;
}

import { Guid } from "guid-typescript";

export class ProductDto {
  Id: Guid;
  Sku?: string;
  Name: string;
  Description?: string;
  Image?: string;
  Price?: number;
  BrandId: Guid;
}

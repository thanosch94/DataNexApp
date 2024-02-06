import { Guid } from "guid-typescript";

export class DocumentProductDto {
  Id:Guid;
  DocumentId:Guid;
  ProductId:Guid;
  ProductQuantity:number;
  ProductSizeId:Guid;
}

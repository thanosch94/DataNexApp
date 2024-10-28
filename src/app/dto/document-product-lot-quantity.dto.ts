import { Guid } from "guid-typescript";

export class DocumentProductLotQuantityDto {
  Id?:Guid;
  DocumentProductId?:Guid;
  LotId:Guid;
  Quantity:number;
}

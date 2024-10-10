import { Guid } from "guid-typescript";

export class ProductSizeDto {
  Id:Guid;
  SerialNumber?:number;
  Code?:string;
  Name:string;
  Abbreviation?:string;
}

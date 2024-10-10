import { Guid } from "guid-typescript";

export class BrandDto {
  Id:Guid;
  SerialNumber?:number;
  Code?:string;
  Name:string;

}

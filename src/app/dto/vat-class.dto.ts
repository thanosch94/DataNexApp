import { Guid } from "guid-typescript";

export class VatClassDto {
  Id:Guid
  SerialNumber?:number;
  Code?:string;
  Name:string;
  Description: string;
  Abbreviation: string;
  Rate:number;
  IsActive:boolean;
}

import { Guid } from "guid-typescript";

export class VatClassDto {
  Id:Guid
  Name:string;
  Description: string;
  Abbreviation: string;
  Rate:number;
  IsActive:boolean;
}

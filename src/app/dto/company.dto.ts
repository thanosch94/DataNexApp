import { Guid } from "guid-typescript";

export class CompanyDto {
  Id:Guid
  SerialNumber?:number;
  Code?:string;
  Name:string;
  IsDefault:boolean = false
}

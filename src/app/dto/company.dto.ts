import { Guid } from "guid-typescript";

export class CompanyDto {
  Id:Guid
  ClientId?:Guid;
  SerialNumber?:number;
  Code?:string;
  Name:string;
  IsDefault:boolean = false
  CompanyLoginCode:string
}

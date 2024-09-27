import { Guid } from "guid-typescript";

export class CompanyDto {
  Id:Guid
  Name:string;
  IsDefault:boolean = false
}

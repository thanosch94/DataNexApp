import { Guid } from "guid-typescript";

export class DocumentSeriesDto {
  Id:Guid;
  Name:string;
  Notes?:string;
  Abbreviation:string;
  Prefix?:string;
  Suffix?:string;
  CurrentNumber:number;
  AllowManualNumbering:boolean;
  CompanyId:Guid;
  DocumentTypeId:Guid;
  IsActive:boolean;
}

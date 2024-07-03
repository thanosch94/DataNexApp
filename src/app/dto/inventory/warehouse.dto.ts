import { Guid } from "guid-typescript";

export class WarehouseDto {
  Id:Guid;
  Code:string;
  Name:string;
  IsDefault:boolean;
  CompanyId?:Guid;
}

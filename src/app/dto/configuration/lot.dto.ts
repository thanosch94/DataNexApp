import { Guid } from "guid-typescript";

export class LotDto {
  Id:Guid;
  Name:string;
  Notes:string;
  ProdDate:string|Date|number;
  ExpDate:string|Date|number;
  CompanyId:Guid;
}

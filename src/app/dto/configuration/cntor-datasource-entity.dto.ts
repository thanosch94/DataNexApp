import { Guid } from "guid-typescript";

export class CntorDatasourceEntityDto {
  Id:Guid;
  CntorDatasourceId:Guid;
  Name:string;
  Description?:string;
  Icon?:string;
  IconColor?:string;
  CompanyId:Guid;
}

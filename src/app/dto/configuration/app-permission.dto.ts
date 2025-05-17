import { Guid } from "guid-typescript";
import { AppEntityEnum } from "../../enums/app-entity.enum";

export class AppPermissionDto {
  Id?:Guid;
  Name?:string;
  Key:string;
  AppEntity:AppEntityEnum;
  MasterEntityId?:Guid;
  CompanyId?:Guid;
}

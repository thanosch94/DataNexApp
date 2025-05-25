import { Guid } from "guid-typescript";
import { AppEntityEnum } from "../../enums/app-entity.enum";
import { UserAppPermissionDto } from "./user-app-permission.dto";

export class AppPermissionDto {
  Id?:Guid;
  Name?:string;
  Key:string;
  AppEntity:AppEntityEnum;
  MasterEntityId?:Guid;
  MasterEntityDescr?:string;
  CompanyId?:Guid;
  UserAppPermissions?: UserAppPermissionDto[]
}

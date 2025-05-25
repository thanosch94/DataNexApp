import { Guid } from "guid-typescript"

export class UserAppPermissionDto {
  Id:Guid;
  AppPermissionId:Guid;
  UserId:Guid;
  UserName:string;
  CompanyId:Guid;
}

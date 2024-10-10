import { Guid } from "guid-typescript";
import { UserRolesEnum } from "../enums/user-roles.enum";

export class UserDto {
  Id:Guid;
  SerialNumber?:number;
  Code?:string;
  Name:string;
  Email:string;
  UserName:string;
  Password:string;
  UserRole:UserRolesEnum;
  CompanyId:Guid;
  Token?: string;
}

import { Guid } from "guid-typescript";

export class UserDto {
  Id:Guid;
  Name:string;
  Email:string;
  Username:string;
  Password:string;
  UserRole:string;
  CompanyId:Guid;
}

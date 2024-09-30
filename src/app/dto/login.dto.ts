import { Guid } from "guid-typescript";

export class LoginDto {
  UserName: string;
  Password:string;
  CompanyId: Guid;
}

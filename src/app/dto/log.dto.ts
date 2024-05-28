import { Guid } from "guid-typescript";
import { LogOriginEnum } from "../enums/log-origin.enum";
import { LogTypeEnum } from "../enums/log-type.enum";

export class LogDto {
  Id:Guid;
  DateAdded:Date;
  AddedDateTimeFormatted:string;
  LogName:string;
  LogType:LogTypeEnum;
  LogTypeName:string;
  LogOrigin:LogOriginEnum;
  LogOriginName:string;
  UserAdded:Guid;
  UserNameAdded:string;
}

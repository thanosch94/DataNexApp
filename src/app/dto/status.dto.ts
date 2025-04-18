import { Guid } from "guid-typescript";
import { StatusTypeEnum } from "../enums/status-type.enum";

export class StatusDto {
  Id:Guid;
  SerialNumber?:number;
  Code?:string;
  Name:string;
  Icon?:string;
  IconColor?:string;
  IsDefault:boolean;
  Order?:number;
  StatusType:StatusTypeEnum
}

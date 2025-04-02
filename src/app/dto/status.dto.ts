import { Guid } from "guid-typescript";
import { StatusTypeEnum } from "../enums/status-type.enum";

export class StatusDto {
  Id:Guid;
  SerialNumber?:number;
  Code?:string;
  Name:string;
  StatusType:StatusTypeEnum
}

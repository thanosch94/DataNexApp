import { Guid } from "guid-typescript";

export class StatusDto {
  Id:Guid;
  SerialNumber?:number;
  Code?:string;
  Name:string;
}

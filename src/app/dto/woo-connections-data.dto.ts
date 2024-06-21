import { Guid } from "guid-typescript";
import { RequestTypeEnum } from "../enums/request-type.enum";

export class WooConnectionsDataDto {
  Id:Guid;
  Name:string;
  RequestType:RequestTypeEnum;
  Endpoint:string;
}

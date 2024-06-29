import { Guid } from "guid-typescript";
import { RequestTypeEnum } from "../enums/request-type.enum";
import { WooEntityEnum } from "../enums/woo-entity.enum";

export class WooConnectionsDataDto {
  Id:Guid;
  Name:string;
  RequestType:RequestTypeEnum;
  Endpoint:string;
  WooEntity:WooEntityEnum
}

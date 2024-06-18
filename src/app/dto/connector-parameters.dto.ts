import { Guid } from "guid-typescript";

export class ConnectorParametersDto {
  Id:Guid
  WooBaseUrl:string;
  WooConsumerKey:string;
  WooConsumerSecret:string;
}

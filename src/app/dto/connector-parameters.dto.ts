import { Guid } from "guid-typescript";

export class ConnectorParametersDto {
  Id:Guid
  SerialNumber?:number;
  Code?:string;
  WooBaseUrl:string;
  WooConsumerKey:string;
  WooConsumerSecret:string;
}

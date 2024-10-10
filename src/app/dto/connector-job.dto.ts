import { Guid } from "guid-typescript"
import { ConnectorJobTypeEnum } from "../enums/connector-job-type.enum";
import { WooConnectionsDataDto } from "./woo-connections-data.dto";

export class ConnectorJobDto {
  Id:Guid
  SerialNumber?:number;
  Code?:string;
  Name:string;
  Serialnumber:number;
  Description:string;
  Icon?:string;
  JobType:ConnectorJobTypeEnum
  DataSourceId: Guid
  WooConnectionDataSourceId:Guid
}

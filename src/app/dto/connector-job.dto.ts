import { Guid } from "guid-typescript"
import { ConnectorJobTypeEnum } from "../enums/connector-job-type.enum";

export class ConnectorJobDto {
  Id:Guid
  Name:string;
  Serialnumber:number;
  Description:string;
  Icon:string;
  JobType:ConnectorJobTypeEnum
  DataSourceId: Guid
  WooConnectionDataSourceId:Guid
}

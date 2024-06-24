import { ConnectorJobTypeEnum } from "../enums/connector-job-type.enum";

export class ConnectorJobTypeEnumList {
  static value = [
    {Id: ConnectorJobTypeEnum.Receive, Name: "Receive"},
    {Id: ConnectorJobTypeEnum.Transfer, Name: "Transfer"}
  ]

}

import { Guid } from "guid-typescript";

export class DocumentAdditionalChargeDto {
  Id:Guid;
  SerialNumber?:number;
  Code?:string;
  DocumentId:Guid;
  AdditionalChargeId:Guid;
  AdditionalChargeName:string
  AdditionalChargeAmount:number;
}

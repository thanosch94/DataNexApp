import { Guid } from "guid-typescript";

export class DocumentAdditionalChargeDto {
  Id:Guid;
  DocumentId:Guid;
  AdditionalChargeId:Guid;
  AdditionalChargeName:string
  AdditionalChargeAmount:number;
}

import { Guid } from "guid-typescript";

export class DocumentAdditionalChargeDto {
  Id:Guid;
  DocumentId:Guid;
  ChargeId:Guid;
  ChargeName:string
  Amount:number;
  IsRowFilled:boolean;
}

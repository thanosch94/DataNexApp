import { Guid } from "guid-typescript";

export class AdditionalChargeDto {
  Id: Guid;
  SerialNumber?:number;
  Code?:string;
  Name: string;
}

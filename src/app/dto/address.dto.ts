import { Guid } from "guid-typescript";
import { AddressTypeEnum } from "../enums/address-type.enum";

export class AddressDto {
  Id:Guid;
  AddressType:AddressTypeEnum;
  Street:string;
  StreetNumber?:string;
  PostalCode?:string;
  City:string;
  Country?:string;
  CompanyId?:Guid;
}

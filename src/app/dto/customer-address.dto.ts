import { Guid } from "guid-typescript";
import { AddressTypeEnum } from "../enums/address-type.enum";
import { AddressDto } from "./address.dto";

export class CustomerAddressDto {
  Id:Guid;
  AddressType:AddressTypeEnum;
  AddressId:Guid;
  Address:AddressDto;
  CustomerId:Guid;
  CompanyId:Guid;
  IsDefault:boolean;
  Notes?:string;
  IsInEditMode:boolean;
  TempId: string;;
}

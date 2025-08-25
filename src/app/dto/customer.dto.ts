import { Guid } from 'guid-typescript';
import { CustomerAddressDto } from './customer-address.dto';

export class CustomerDto {
  Id: Guid;
  SerialNumber?:number;
  Code?:string;
  Name: string;
  Notes: string;
  Address?: string;
  Region?: string;
  PostalCode?: string;
  City?: string;
  Country?: string;
  Phone1?: string;
  Phone2?: string;
  Email?: string;
  VatClassId?:Guid;
  VatNumber?: number;
  TaxOffice?: string;
  UserText1?:string;
  UserText2?:string;
  UserText3?:string;
  UserText4?:string;
  UserNumber1?:number;
  UserNumber2?:number;
  UserNumber3?:number;
  UserNumber4?:number;
  UserDate1?:Date;
  UserDate2?:Date;
  UserDate3?:Date;
  UserDate4?:Date;
  CustomerAddresses: CustomerAddressDto[];
}

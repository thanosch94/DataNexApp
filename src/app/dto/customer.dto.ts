import { Guid } from 'guid-typescript';

export class CustomerDto {
  Id: Guid;
  SerialNumber?:number;
  Code?:string;
  Name: string;
  Address?: string;
  Region?: string;
  PostalCode?: string;
  City?: string;
  Country?: string;
  Phone1?: string;
  Phone2?: string;
  Email?: string;
  VatNumber?: number;
  TaxOffice?: string;
}

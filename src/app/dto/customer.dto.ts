import { Guid } from 'guid-typescript';

export class CustomerDto {
  Id: Guid;
  Name: string;
  Address?: string;
  Region?: string;
  PostalCode?: string;
  City?: string;
  Country?: string;
  Phone1?: number;
  Phone2?: number;
  Email?: string;
  VatNumber?: number;
  TaxOffice?: string;
}
